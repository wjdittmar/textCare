package data

import (
	"encoding/json"
	"os"
	"strings"
)

type ICD10 struct {
	Code string `json:"-"`
	Desc string `json:"desc"`
}

type ICD10Model struct {
	data []ICD10
}

func NewICD10Model() ICD10Model {
	model := ICD10Model{}
	err := model.loadFromFile("internal/data/icd10_codes.json")
	if err != nil {
		panic(err)
	}
	return model
}

func (m *ICD10Model) loadFromFile(filename string) error {
	fileData, err := os.ReadFile(filename)
	if err != nil {
		return err
	}

	var codes []ICD10
	if err := json.Unmarshal(fileData, &codes); err != nil {
		return err
	}

	m.data = codes
	return nil
}

func (m *ICD10Model) SearchByDescription(query string, limit int) []ICD10 {
	var results []ICD10
	for _, code := range m.data {
		if containsIgnoreCase(code.Desc, query) {
			results = append(results, code)
			if len(results) == limit {
				break
			}
		}
	}
	return results
}

func containsIgnoreCase(text, substring string) bool {
	return strings.Contains(strings.ToLower(text), strings.ToLower(substring))
}
