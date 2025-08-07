package service

import (
	"encoding/csv"
	"errors"
	repository "final_projecAI_GO/repository"
	"strings"
)

type FileService struct {
	Repo *repository.FileRepository
}

func (s *FileService) ProcessFile(fileContent string) (map[string][]string, error) {
	if len(strings.TrimSpace(fileContent)) == 0 {
		return nil, errors.New("file content is empty")
	}

	reader := csv.NewReader(strings.NewReader(fileContent))

	headers, err := reader.Read()
	if err != nil {
		return nil, errors.New("failed to read header row from CSV")
	}

	result := make(map[string][]string)
	for _, header := range headers {
		result[header] = []string{}
	}

	for {
		record, err := reader.Read()
		if err != nil {

			if err.Error() == "EOF" {
				break
			}
			return nil, errors.New("failed to read data rows from CSV")
		}

		if len(record) != len(headers) {
			return nil, errors.New("data row does not match header column count")
		}

		for i, value := range record {
			result[headers[i]] = append(result[headers[i]], strings.TrimSpace(value))
		}
	}

	return result, nil
	// return nil, nil // TODO: replace this
}
