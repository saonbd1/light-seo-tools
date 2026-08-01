# Scrapebox Duplicate URL Finder Workflow

## Purpose

Process a submitted URL list in Scrapebox, remove duplicate entries, and prepare a clean CSV report for delivery.

## Input requirements

- Accepted files: `.txt` or `.csv`
- One URL per line is preferred.
- Keep the original upload unchanged.
- Use only URLs that you are authorized to process.

## Scrapebox procedure

1. Create a job folder named with the request ID, for example:
   `requests/2026-08-01-0001-duplicate-urls/`
2. Save the uploaded file as `input-original.txt` or `input-original.csv`.
3. Open Scrapebox and import the URLs into the URL list.
4. Normalize the list where appropriate:
   - remove blank lines
   - remove leading/trailing spaces
   - preserve or remove URL parameters consistently for the job
   - decide whether `http` and `https` should be treated as separate URLs
5. Run Scrapebox's duplicate removal function.
6. Export the cleaned list as `unique-urls.txt` or `unique-urls.csv`.
7. Preserve the original list and record the counts below.

## Report format

Use this CSV structure:

```csv
url,status
https://example.com/page-a,unique
https://example.com/page-a,duplicate
```

Recommended summary fields:

- Request ID
- Input filename
- Input URL count
- Unique URL count
- Duplicate URL count
- Processing date
- Normalization rules used

## Quality checks

- Confirm the output file opens correctly.
- Confirm every output row is a valid URL or is clearly marked as invalid.
- Compare the input and output counts.
- Spot-check duplicate groups.
- Do not publish client URLs in the public GitHub repository.

## Delivery

Upload the finished report to private storage such as Google Drive, Dropbox, or S3. Add the private link and status to the admin Google Sheet. Use the admin page's Report Link Helper to include an expiry date in the note.

## Test data

Use `sample-reports/duplicate-urls-sample.csv` only for a test run. Replace it with a real Scrapebox export after the workflow is verified.
