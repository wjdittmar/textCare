package httpclient

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"time"
)

type SearchResult interface{}

type CMTResult struct {
	SCTID                 string `json:"sctid"`
	ClinicianFriendlyName string `json:"clinician_friendly_name"`
	PatientFriendlyName   string `json:"patient_friendly_name"`
	ICD10CM               string `json:"icd_10_cm"`
	FullySpecifiedName    string `json:"fully_specified_name"`
	Module                string `json:"module"`
}

type MedicationResult struct {
	RXCUI          string `json:"rxcui"`
	MedicationName string `json:"medication_name"`
	PreferredTerm  string `json:"preferred_term"`
	TTY            string `json:"tty"`
	Source         string `json:"source"`
	Code           string `json:"code"`
}

type CMTResponse struct {
	CmtCodes []CMTResult `json:"cmtCodes"`
}

type SearchConfig struct {
	Endpoint string
	Query    string
	Limit    int
}

type MedicationResponse struct {
	Medications []MedicationResult `json:"medications"`
}

type Client struct {
	BaseURL    string
	HTTPClient *http.Client
}

func New(baseURL string) *Client {
	return &Client{
		BaseURL: baseURL,
		HTTPClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (c *Client) Search(ctx context.Context, config SearchConfig) (*http.Response, error) {

	u, err := url.Parse(c.BaseURL + config.Endpoint)
	if err != nil {
		return nil, fmt.Errorf("invalid base URL: %w", err)
	}

	q := u.Query()
	q.Set("q", config.Query)
	q.Set("limit", strconv.Itoa(config.Limit))
	u.RawQuery = q.Encode()

	req, err := http.NewRequestWithContext(ctx, "GET", u.String(), nil)
	if err != nil {
		return nil, fmt.Errorf("create request failed: %w", err)
	}

	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}
	return resp, nil

}

func (c *Client) SearchMedications(ctx context.Context, query string, limit int) ([]MedicationResult, error) {
	sc := SearchConfig{
		Endpoint: "/v1/terminology/medications/search",
		Query:    query,
		Limit:    limit,
	}
	res, err := c.Search(ctx, sc)
	if err != nil {
		return nil, err
	}

	var response struct {
		MedicationCodes []MedicationResult `json:"medications"`
	}
	defer res.Body.Close()
	if err := json.NewDecoder(res.Body).Decode(&response); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return response.MedicationCodes, nil

}

func (c *Client) SearchCMT(ctx context.Context, query string, limit int) ([]CMTResult, error) {

	sc := SearchConfig{
		Endpoint: "/v1/terminology/cmt/search",
		Query:    query,
		Limit:    limit,
	}
	res, err := c.Search(ctx, sc)
	if err != nil {
		return nil, err
	}

	var response struct {
		CmtCodes []CMTResult `json:"cmtCodes"`
	}

	defer res.Body.Close()

	if err := json.NewDecoder(res.Body).Decode(&response); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return response.CmtCodes, nil
}
