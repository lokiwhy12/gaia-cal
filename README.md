# gaia-cal

Add Event landing for #gaia lock-ins (not Subscribe).

## iOS notes
- **Apple:** use hosted `.ics` (`?ics=e/….ics`) or the page’s `data:text/calendar` link. Blob downloads are flaky.
- **Google:** TEMPLATE must use **UTC `Z` dates**. Floating local + `ctz` often opens empty in the Google Calendar **app** (Universal Links). Prefer Apple/.ics on iPhone if Google still opens empty.

## URL
```
https://lokiwhy12.github.io/gaia-cal/?title=TITLE&start=YYYY-MM-DDTHH:MM:SS&end=…&tz=America/Chicago&startUtc=…Z&endUtc=…Z&ics=e/slug.ics
```

## Example
```
https://lokiwhy12.github.io/gaia-cal/?title=Lunch+with+Loki&start=2026-09-20T12:00:00&end=2026-09-20T13:00:00&tz=America/Chicago&startUtc=20260920T170000Z&endUtc=20260920T180000Z&ics=e/lunch-with-loki.ics
```

## Wake
```bash
python3 ~/dev/gaia-imessage/make_calendar_share.py \
  --title "Lunch with Loki" \
  --start 2026-09-20T12:00:00 --end 2026-09-20T13:00:00 \
  --tz America/Chicago --write-ics --slug lunch-with-loki --push-ics --send --chat-id '…'
```
