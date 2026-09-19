# gaia-cal

Add Event landing for #gaia lock-ins (**not** Subscribe).

## Hard iOS constraint
An **https URL that ends in `.ics`** (Gist, GH Pages, jsDelivr, …) opens iOS **Add Subscription Calendar**, not Add Event. MIME `text/calendar` does not change that.

## Apple path (candidate — retest on device)
Serve the same ICS bytes from a **non-`.ics` URL** on Vercel:

```
https://gaia-cal.vercel.app/add/lunch-with-loki
```

That returns `200` + `Content-Type: text/calendar` with `Content-Disposition: inline; filename="….ics"`. Path has no `.ics`.

Alternate (303 trampoline to hosted `.ics`):

```
https://gaia-cal.vercel.app/go/lunch-with-loki
```

**Do not declare shipped until an iPhone tap shows Add Event / Save.** Subscription is failure.

## Google path
TEMPLATE must use **UTC `Z` dates**. Universal Links into the Google Calendar **app** often open empty from Messages. Landing page routes Google through `https://gaia-cal.vercel.app/api/google?u=…` (tap in Safari).

## Chooser page (GH Pages)
```
https://lokiwhy12.github.io/gaia-cal/?title=…&start=…&end=…&tz=America/Chicago&startUtc=…Z&endUtc=…Z&ics=e/slug.ics
```
Apple button → Vercel `/add/<slug>`. Google button → Vercel google bounce.

## One-tap from Messages (preferred when slug exists)
Text the Vercel add URL directly — not a raw `.ics` link.

## Wake
```bash
python3 ~/dev/gaia-imessage/make_calendar_share.py \
  --title "Lunch with Loki" \
  --start 2026-09-20T12:00:00 --end 2026-09-20T13:00:00 \
  --tz America/Chicago --write-ics --slug lunch-with-loki --push-ics --send --chat-id '…'
```

Survivors if `/add` still Subscribes: email guest invite (`METHOD:REQUEST`), or Messages `.ics` attachment (fix `transfer_state=6` first). Do not spam Gaby — use Testboys for attach tests.
