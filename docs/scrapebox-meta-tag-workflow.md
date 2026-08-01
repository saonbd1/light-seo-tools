# Scrapebox Meta Tag Scraper Workflow

## Purpose

Process a plain-text URL list in Scrapebox and export page metadata for delivery.

## Input

- Scrapebox input file: `.txt`
- One URL per line
- Preserve the original submitted file
- Process only URLs that you are authorized to analyze

For a safe test, import:

`sample-inputs/meta-tags-sample-urls.txt`

This file includes a deliberate duplicate URL so you can verify how the workflow handles repeated inputs.

## Scrapebox procedure

1. Create a request folder using the request ID.
2. Save the submitted URL list as `input-scrapebox.txt`.
3. Import the text file into Scrapebox.
4. Open the Page Analyzer or metadata extraction workflow.
5. Select the fields required for the report:
   - URL
   - Title
   - Meta description
   - Optional: keywords, canonical URL, status code, word count
6. Run the analysis.
7. Export the results as HTML, TXT, CSV, or XLSX, depending on the delivery requirement.
8. Save the export using a request-specific filename, such as:
   `meta-tags-2026-08-01-0001.csv`

## Expected CSV structure

The tested CSV output is valid when it contains columns such as:

```csv
Url,Title,Description
http://example.com/,Example Domain,
```

An empty Description field is valid when the analyzed page does not contain a meta description.

## Quality checks

- Confirm the URL count matches the analyzed list, allowing for failed requests.
- Confirm titles and descriptions are assigned to the correct URLs.
- Keep empty metadata fields empty; do not invent values.
- Check for encoding problems or broken characters.
- Record pages that failed to load separately when Scrapebox provides that information.
- Do not publish client URLs or metadata in the public repository.

## Delivery

Upload the finished report to private storage such as Google Drive, Dropbox, or S3. Add the private report link and request status to the admin Google Sheet.

## Test result

The current test result:

```csv
Url,Title,Description
http://example.com/,Example Domain,
```

is suitable as a basic Meta Tag Scraper report. The missing description indicates that the page has no meta description.
