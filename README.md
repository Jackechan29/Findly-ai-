# Findly — autonomous affiliate discovery, phase 1

## Current state (15 November 2026)
- Responsive UK-first storefront with product/category search and clear commission disclosure.
- No fictitious offers, fake earnings, or unauthorised retailer images.
- Catalogue synchroniser runs on demand or every six hours using GitHub Actions.
- **Not yet live to shoppers**: publication via GitHub Pages or Vercel must be configured.
- **Not yet connected to a retailer**: requires approved affiliate programme access and an authorised JSON feed.

## Connect a feed safely
1. Apply to an affiliate programme such as Awin, eBay Partner Network, or Amazon Associates using your real business details. Never create duplicate/fake accounts.
2. Obtain an authorised product feed. Transform it, if necessary, into HTTPS JSON of this form:
```json
{"products":[{"title":"Example product","category":"Home","merchant":"Example retailer","affiliate_url":"https://example.com/approved-affiliate-link","price_label":"£49.99"}]}
```
3. Store the JSON at an HTTPS URL you control, with permission to reproduce the descriptions and any later images.
4. In GitHub repository Settings > Secrets and variables > Actions, set the repository secret `FEED_URL` to that HTTPS URL. Never put your credentials or feed access tokens into this repository.
5. Run Actions > Refresh authorised product catalogue > Run workflow, or wait for the six-hour schedule.
6. Confirm `catalog.json` contains approved, current items. Prices may change; users must confirm checkout price.

## Publish
Configure GitHub Pages to publish from the main branch root, or connect the repository to Vercel as a static site. Confirm the published link before marketing it.

## Limits and roadmap
The feed synchroniser validates record structure and HTTPS links, but it cannot confirm that a partner actually approved each link; only ingest feeds you are permitted to use. There is no automatic publisher account creation, social posting, ad spending or earnings reporting yet. Those require individual programme approvals and permitted integrations.

Next milestones:
1. Approved affiliate account + first lawful feed.
2. Verified public deployment.
3. Event analytics (search, outbound clicks, conversion data available from partner dashboards).
4. Helpful original buying guides and SEO pages; avoid mass-produced thin content.
5. Opt-in price alerts and curated newsletters, respecting data protection and consent requirements.
6. Country and currency support using region-specific approved affiliate partnerships.

Primary success metrics: qualified visitors, outbound retail clicks, approved commissions, and net profit after all costs. Affiliate automation alone does not guarantee revenue.
