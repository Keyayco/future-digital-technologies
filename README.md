# Future Digital Technologies — Website Demo

A standalone demonstration website for Future Digital Technologies. It uses plain HTML, CSS, browser JavaScript and locally stored images; no build step, frameworks, paid services or external image hosting are required.

## Preview it locally

Open `index.html` in a browser. To test the same pages through a local web server, start a server in this folder, for example:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish with GitHub Pages

1. Copy the files in this folder (`index.html`, `styles.css`, `script.js`, `README.md` and `assets/`) into the root of a GitHub repository. Alternatively, place them inside the folder GitHub Pages is configured to publish.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select your publishing branch and the folder containing `index.html`, then select **Save**.
5. Open the published URL shown on the Pages settings screen. Changes can take a short time to appear.

## Before presenting this demo as a business website

- Confirm that the four proposed appliance categories and enquiry coverage are accurate.
- Replace the owner-story placeholder with text supplied and approved by the business.
- Confirm the business address, contact number, service areas, and photographs with the business owner.
- The enquiry form validates details in the browser and prepares a WhatsApp message for the visitor to review and send. It does not send, retain or store an enquiry on its own.
- The business information shown here comes from the details provided for this demonstration. No qualifications, certifications, opening hours, response times or service guarantees are claimed.

## Files

```text
index.html
styles.css
script.js
README.md
assets/
  appliance-technician.jpg
  home-appliances.jpg
```