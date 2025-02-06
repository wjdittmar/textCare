package httpclient

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"
)

type TerminologyClient struct {
	baseURL    string
	httpClient *http.Client
}

func NewTerminologyClient(baseURL string) *TerminologyClient {
	return &TerminologyClient{
		baseURL: baseURL,
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

type ICD10Code struct {
	Code string `json:"code"`
	Desc string `json:"desc"`
}

func (c *TerminologyClient) SearchICD10(ctx context.Context, query string, limit int) ([]ICD10Code, error) {
	endpoint := "/v1/terminology/icd10"

	params := url.Values{}
	params.Add("q", query)
	params.Add("limit", fmt.Sprintf("%d", limit))

	reqURL := fmt.Sprintf("%s%s?%s", c.baseURL, endpoint, params.Encode())
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, reqURL, nil)
	if err != nil {
		return nil, fmt.Errorf("create request failed: %w", err)
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("unexpected status %d: %s", resp.StatusCode, string(body))
	}

	var response struct {
		ICD10 []ICD10Code `json:"icd10"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return nil, fmt.Errorf("decode response failed: %w", err)
	}

	return response.ICD10, nil
}
