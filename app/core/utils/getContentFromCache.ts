export default async function getContentFromCache() {
    const content = await fetch("http://localhost:3000/api/web/cache", { headers: { "content-type": "text/html" } });
    const text = await content.text();
    return text;
}
