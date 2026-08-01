# Report Templates and Delivery

## Standard report naming

Use the request ID in every filename:

- `REQ-0001-duplicate-urls.txt`
- `REQ-0001-duplicate-urls.csv`
- `REQ-0002-meta-tags.csv`
- `REQ-0002-meta-tags.xlsx`
- `REQ-0002-meta-tags.html`

## Duplicate URL report

Scrapebox exports the cleaned unique URL list. Deliver the native export selected by the operator:

- TXT: one unique URL per line
- CSV: structured URL export
- XLSX: spreadsheet export
- HTML: readable report

Record the following in the admin sheet:

- Request ID
- Original filename
- Input URL count
- Unique URL count
- Duplicate count
- Export format
- Report link
- Status

## Meta tag report

Recommended columns:

- Url
- Title
- Description
- Optional status code
- Optional canonical URL

Keep missing titles or descriptions blank and record failed URLs separately when available.

## Delivery checklist

1. Create a request-specific folder outside the public GitHub repository.
2. Save the original input and Scrapebox export.
3. Check the output opens correctly.
4. Confirm counts and metadata columns.
5. Upload the finished report to private Google Drive, Dropbox, or S3.
6. Set an expiry or remove the file after the retention period.
7. Paste the private report link into the admin Google Sheet.
8. Set the request status to `Ready`.
9. Email the requester with the report link.
10. Set the request status to `Delivered`.

Never place real client reports or private download links in the public repository.
