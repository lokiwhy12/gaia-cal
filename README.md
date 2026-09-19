# gaia-cal

One-tap **Add Event** landing for #gaia lock-ins.

Not a calendar subscription. Opens Google with a prefilled event, or downloads a one-shot `.ics` that iPhone Calendar treats as Add Event.

## URL pattern

```
https://lokiwhy12.github.io/gaia-cal/?title=TITLE&start=YYYY-MM-DDTHH:MM:SS&end=YYYY-MM-DDTHH:MM:SS&tz=America/Chicago
```

Optional: `location`, `details`.

`start` / `end` are **local wall times** in `tz`. Do not append `Z`.

## Example (Gaby Sunday lunch)

Lunch with Loki · Sun Sep 20, 2026 · 12:00–1:00pm America/Chicago

```
https://lokiwhy12.github.io/gaia-cal/?title=Lunch%20with%20Loki&start=2026-09-20T12:00:00&end=2026-09-20T13:00:00&tz=America/Chicago
```

## Wake integration

From gaia-imessage / GAIA wake, build the query string and send it as text via `send_gaia_imessage.py` (attachments stay broken; this is the product path).

```bash
python3 ~/dev/gaia-imessage/make_calendar_share.py \
  --title "Lunch with Loki" \
  --start "2026-09-20T12:00:00" \
  --end "2026-09-20T13:00:00" \
  --tz America/Chicago \
  --chat-name "..." \
  --send
```
