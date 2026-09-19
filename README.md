# gaia-cal

**Product path (confirmed):** Apple Add Event via Vercel 303 hop.

```
https://gaia-cal.vercel.app/add/<slug>
  → 303 → https://gaia-cal.vercel.app/e/<slug>.ics
```

Do not link directly to `.ics` (iOS Subscribe). Google TEMPLATE does **not** reliably prefill on iPhone — demoted; email guest invite when you have an address.

## Wake (text one_tap only when no guest email)
```bash
python3 ~/dev/gaia-imessage/make_calendar_share.py \
  --title "Lunch with Loki" \
  --start 2026-09-20T12:00:00 --end 2026-09-20T13:00:00 \
  --tz America/Chicago --write-ics --slug lunch-with-loki --push-ics --send --chat-id '…'
```
