import { AwsClient } from "aws4fetch";

/** Short-lived signed download URL for a file in a private Cloudflare R2 bucket. */
export async function signedFileUrl(key: string, filename: string, ttlSeconds = 300) {
  const { R2_ACCOUNT_ID: account, R2_ACCESS_KEY_ID: accessKeyId, R2_SECRET_ACCESS_KEY: secretAccessKey, R2_BUCKET: bucket } = process.env;
  if (!account || !accessKeyId || !secretAccessKey || !bucket) throw new Error("Cloudflare R2 environment variables are not configured.");
  const client = new AwsClient({ accessKeyId, secretAccessKey, service: "s3", region: "auto" });
  const url = new URL(`https://${account}.r2.cloudflarestorage.com/${bucket}/${key}`);
  url.searchParams.set("X-Amz-Expires", String(ttlSeconds));
  url.searchParams.set("response-content-disposition", `attachment; filename="${filename.replace(/"/g, "")}"`);
  const signed = await client.sign(new Request(url, { method: "GET" }), { aws: { signQuery: true } });
  return signed.url;
}