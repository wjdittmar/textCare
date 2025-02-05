package client

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
)

type TerminologyClient struct {
	baseURL    string
	httpClient *http.Client
}

type TerminologyCode struct {
	Code        string `json:"code"`
	Display     string `json:"display"`
	Description string `json:"description,omitempty"`
}

func NewTerminologyClient(baseURL string) *TerminologyClient {
	return &TerminologyClient{
		baseURL:    baseURL,
		httpClient: &http.Client{Timeout: 10 * time.Second},
	}
}

func (c *TerminologyClient) Search(ctx context.Context, system, query string, limit int) ([]TerminologyCode, error) {
	params := url.Values{}
	params.Add("system", system)
	params.Add("q", query)
	params.Add("limit", fmt.Sprintf("%d", limit))

	reqURL := fmt.Sprintf("%s/v1/terminology/search?%s", c.baseURL, params.Encode())

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, reqURL, nil)
	if err != nil {
		return nil, err
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status: %d", resp.StatusCode)
	}

	var result struct {
		Results []TerminologyCode `json:"results"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	return result.Results, nil
}
