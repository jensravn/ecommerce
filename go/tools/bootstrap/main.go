package main

import (
	"errors"
	"flag"
	"fmt"
	"log"
	"os"
	"os/exec"
)

var p = flag.String("p", "", "Google Cloud Project ID (required).")

func main() {
	flag.Parse()
	err := run(*p)
	if err != nil {
		log.Fatalf("error: %v", err)
	}
	fmt.Println("bootstrap successful.")
}

func run(PROJECT_ID string) error {
	err := createProject(PROJECT_ID)
	if err != nil {
		return fmt.Errorf("create project: %v", err)
	}
	return nil
}

func createProject(PROJECT_ID string) error {
	if PROJECT_ID == "" {
		return errors.New("PROJECT_ID is required")
	}
	cmd := exec.Command("gcloud", "projects", "create", PROJECT_ID)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("exec cmd gcloud projects create: %v", err)
	}
	return nil
}
