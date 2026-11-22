export interface BiblePlugin { code: string; name: string; language: string; priceNgn: number; copyright: string; file: string }

// priceNgn: 0 = free. `file` is the object key of the file in your PRIVATE Cloudflare R2 bucket.
// IMPORTANT: only list translations you are licensed to distribute or sell.

export const bibles: BiblePlugin[] = [
  { code: "ASV", name: "American Standard Version", language: "English", priceNgn: 0, copyright: "1901, Public Domain", file: "bibles/ASV.zip" },
  { code: "KJV", name: "King James Version", language: "English", priceNgn: 0, copyright: "Public Domain", file: "bibles/KJV.zip" },
  { code: "WEB", name: "World English Bible", language: "English", priceNgn: 0, copyright: "Public Domain", file: "bibles/WEB.zip" },
  // Paid example (uncomment and edit):
  // { code: "XYZ", name: "Example Translation", language: "Yoruba", priceNgn: 5000, copyright: "© Licensor, used with permission", file: "bibles/XYZ.zip" },
];

export const findBible = (code: string) => bibles.find((b) => b.code === code);
export const koboFor = (b: BiblePlugin) => Math.round(b.priceNgn * 100);