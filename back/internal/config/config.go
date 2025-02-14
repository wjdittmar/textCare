package config

import (
	"fmt"
	"os"
	"strings"
)

type Config struct {
	Port                  int
	Env                   string
	DB                    DBConfig
	Limiter               LimiterConfig
	CORSAllowedOrigins    []string
	ServiceName           string
	APIServiceURL         string
	TerminologyServiceURL string
}

type DBConfig struct {
	DSN          string
	MaxOpenConns int
	MaxIdleConns int
	MaxIdleTime  string
}

type LimiterConfig struct {
	RPS     float64
	Burst   int
	Enabled bool
}

func LoadConfig(serviceName string) (*Config, error) {
	cfg := &Config{ServiceName: serviceName}

	portVar := "PORT"
	if serviceName == "terminology" {
		portVar = "TERMINOLOGY_PORT"
	} else if serviceName == "api" {
		portVar = "API_PORT"

	}

	cfg.APIServiceURL = os.Getenv("API_SERVICE_URL")
	cfg.TerminologyServiceURL = os.Getenv("TERMINOLOGY_SERVICE_URL")

	if serviceName == "api" && cfg.TerminologyServiceURL == "" {
		return nil, fmt.Errorf("TERMINOLOGY_SERVICE_URL environment variable must be set")
	}

	portStr := os.Getenv(portVar)

	if portStr == "" {
		cfg.Port = 4000
	} else {
		var err error
		_, err = fmt.Sscanf(portStr, "%d", &cfg.Port)
		if err != nil {
			return nil, fmt.Errorf("invalid PORT: %v", err)
		}
	}

	cfg.Env = os.Getenv("ENV")
	if cfg.Env == "" {
		cfg.Env = "development"
	}

	cfg.DB.DSN = os.Getenv("DB_DSN")
	if cfg.DB.DSN == "" {
		return nil, fmt.Errorf("DB_DSN environment variable must be set")
	}

	cfg.DB.MaxOpenConns = 25
	cfg.DB.MaxIdleConns = 25
	cfg.DB.MaxIdleTime = "15m"

	limiterEnabled := os.Getenv("LIMITER_ENABLED")
	if limiterEnabled == "true" {
		cfg.Limiter.Enabled = true
	} else {
		cfg.Limiter.Enabled = false
	}

	rpsStr := os.Getenv("LIMITER_RPS")
	if rpsStr == "" {
		cfg.Limiter.RPS = 10
	} else {
		_, err := fmt.Sscanf(rpsStr, "%f", &cfg.Limiter.RPS)
		if err != nil {
			return nil, fmt.Errorf("invalid LIMITER_RPS: %v", err)
		}
	}

	burstStr := os.Getenv("LIMITER_BURST")
	if burstStr == "" {
		cfg.Limiter.Burst = 20
	} else {
		_, err := fmt.Sscanf(burstStr, "%d", &cfg.Limiter.Burst)
		if err != nil {
			return nil, fmt.Errorf("invalid LIMITER_BURST: %v", err)
		}
	}

	corsOriginsEnv := os.Getenv("CORS_ALLOWED_ORIGINS")
	if corsOriginsEnv == "" {
		return nil, fmt.Errorf("CORS_ALLOWED_ORIGINS environment variable must be set")
	}

	parsedOrigins, err := parseOrigins(corsOriginsEnv)
	if err != nil {
		return nil, fmt.Errorf("invalid CORS_ALLOWED_ORIGINS: %v", err)
	}
	if len(parsedOrigins) == 0 {
		return nil, fmt.Errorf("CORS_ALLOWED_ORIGINS must contain at least one origin")
	}
	cfg.CORSAllowedOrigins = parsedOrigins

	return cfg, nil
}

func parseOrigins(origins string) ([]string, error) {
	if origins == "" {
		return nil, fmt.Errorf("CORS_ALLOWED_ORIGINS is empty")
	}
	parts := strings.Split(origins, ",")
	var trimmed []string
	for _, origin := range parts {
		trimmedOrigin := strings.TrimSpace(origin)
		if trimmedOrigin != "" {
			if strings.HasPrefix(trimmedOrigin, "http://") || strings.HasPrefix(trimmedOrigin, "https://") {
				trimmed = append(trimmed, trimmedOrigin)
			} else {
				return nil, fmt.Errorf("invalid origin format: %s", trimmedOrigin)
			}
		}
	}
	return trimmed, nil
}
