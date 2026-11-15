// Findly feed synchroniser. Only ingest retailer/affiliate feeds you are authorised to use.
// Supply FEED_URL as a GitHub Actions secret, pointing to a JSON endpoint you control.
// Expected JSON: { "products": [ { "title": "...", "category": "...", "merchant": "...",
// "affiliate_url": "https://approved-link...", "price_label": "£29.99" } ] }
import { writeFile } from "node:fs/promises";
const feed=process.env.FEED_URL;
if (!feed) { console.log("FEED_URL not set; keeping existing catalogue."); process.exit(0); }
const url=new URL(feed);
if (url.protocol!=="https:") throw new Error("FEED_URL must use HTTPS");
const controller=new AbortController();
const timeout=setTimeout(()=>controller.abort(),15000);
let response;
try { response=await fetch(url,{signal:controller.signal,headers:{Accept:"application/json"}}); }
finally {clearTimeout(timeout);}
if (!response.ok) throw new Error("Feed returned HTTP "+response.status);
const payload=await response.json();
if (!Array.isArray(payload.products)) throw new Error("Feed must contain products array");
const allowed=(s)=>{try{const u=new URL(s);return u.protocol==="https:"}catch{return false}};
const clean=s=>String(s??"").trim().slice(0,250);
const seen=new Set();
const products=[];
for (const raw of payload.products.slice(0,10000)) {
 const title=clean(raw.title), category=clean(raw.category), merchant=clean(raw.merchant);
 const affiliate_url=String(raw.affiliate_url??"").trim();
 if(!title||!category||!merchant||!allowed(affiliate_url)) continue;
 const key=merchant+"|"+title+"|"+affiliate_url;
 if(seen.has(key))continue;
 seen.add(key);
 products.push({title,category,merchant,affiliate_url,price_label:clean(raw.price_label)});
}
await writeFile("catalog.json",JSON.stringify({updated_at:new Date().toISOString(),products},null,2)+"\n");
console.log("Synced "+products.length+" verified-format product records.");
