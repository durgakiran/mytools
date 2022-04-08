export default async function getContentFromCache(url: string) {
    const content = await fetch(`http://localhost:3000/api/web/cache?url=${url}`, { headers: { "content-type": "text/html" } });
    const text = await content.text();
    return text;
}
