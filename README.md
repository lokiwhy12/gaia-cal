# gaia-cal

Add Event landing for #gaia lock-ins (**not** Subscribe).

## Hard iOS constraint
An **https URL that ends in `.ics`** opens iOS **Add Subscription Calendar**. MIME does not fix it (SO 69631672).

## Proven workaround (shipped for retest)
Link to a **non-`.ics` URL** that returns **HTTP 303** to the final `.ics` (plain 200, `text/calendar`, no auth).

```
https://gaia-cal.vercel.app/add/lunch-with-loki
  → 303 Location: https://gaia-cal.vercel.app/e/lunch-with-loki.ics
```

Same hop: `/go/<slug>`. Do **not** declare shipped until iPhone shows **Add Event / Save**.

## Google
UTC `Z` TEMPLATE. App Universal Links often empty — bounce via `/api/google?u=…` (tap in Safari). Email guest invite is the only reliable same-event path.

## Wake
```bash
python3 ~/dev/gaia-imessage/make_calendar_share.py \
  --title "Lunch with Loki" \
  --start 2026-09-20T12:00:00 --end 2026-09-20T13:00:00 \
  --tz America/Chicago --write-ics --slug lunch-with-loki --push-ics --send --chat-id '…'
```
`one_tap` = `https://gaia-cal.vercel.app/add/<slug>`
