# Scrapebox Duplicate URL Finder Workflow

## Purpose

Process a submitted URL list in Scrapebox, remove duplicate entries, and prepare an HTML, TXT, CSV, or XLSX report for delivery.

## Input requirements

- Scrapebox input file: `.txt` only
- Website uploads may accept `.txt` or `.csv`, but CSV uploads must be converted to plain text before importing into Scrapebox.
- One URL per line is preferred.
- Keep the original upload unchanged.
- Use only URLs that you are authorized to process.

## Scrapebox procedure

1. Create a job folder named with the request ID, for example:
   `requests/2026-08-01-0001-duplicate-urls/`
2. If the upload is CSV, extract the URL column and save it as `input-original.txt`. Preserve the original upload separately.
3. Save the final Scrapebox input as `input-scrapebox.txt`.
4. Open Scrapebox and import `input-scrapebox.txt` into the URL list.
5. Normalize the list where appropriate:
   - remove blank lines
   - remove leading/trailing spaces
   - preserve or remove URL parameters consistently for the job
   - decide whether `http` and `https` should be treated as separate URLs
6. Run Scrapebox's duplicate removal function.
7. Export the report in Scrapebox's supported format:
   - HTML for a readable report
   - TXT for a plain URL list
   - CSV for structured data exchange
   - XLSX for spreadsheet analysis
8. Preserve the original upload and text input, then record the counts below.

## Report format

For a TXT export, use one URL per line:

```text
https://example.com/page-a
https://example.com/page-a
```

Recommended report summary fields:

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

Upload the finished HTML, TXT, CSV, or XLSX report to private storage such as Google Drive, Dropbox, or S3. Add the private link and status to the admin Google Sheet. Use the admin page's Report Link Helper to include an expiry date in the note.

## Test data

Use a plain-text file with one URL per line for the Scrapebox test input. Prefer saving the real test result as HTML, TXT, CSV, or XLSX.
