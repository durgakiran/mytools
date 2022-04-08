import { Button, Grid, Input, Loading, Page } from "@geist-ui/core";
import { useEffect, useState } from "react";
import getContentFromCache from "../core/utils/getContentFromCache";
import validUrl from "../core/utils/validUrl";

const Child = ({ url }: { url: string }) => {
  const [cachedContent, setCachedContent] = useState<string>();
  const [loadingContent, setLoadingContent] = useState(false);

  const fetchResponse = async () => {
    const content = await getContentFromCache(url);
    setLoadingContent(false);
    setCachedContent(content);
  };

  useEffect(() => {
    if (validUrl(url)) {
      setLoadingContent(true);
      fetchResponse();
    }
  }, [url]);

  if (loadingContent) {
    return <div><Loading type="secondary">Loading</Loading></div>
  }

  if (cachedContent) {
    return <div dangerouslySetInnerHTML={{ __html: cachedContent }}></div>;
  }

  return (
    <>
      <h2>Invalid URL</h2>
      <p>Enter valid url</p>
    </>
  );
};

export default function Dashboard() {
  const [url, setUrl] = useState("");

  return (
    <div className="dashboard__wrapper p-4">
      <div className="flex flex-col">
        <div className="w-full flex flex-1">
          <Input
            clearable
            placeholder="enter your url"
            onChange={(e) => setUrl(e.target.value)}
            width="100%"
          />
        </div>
        <Page padding={0} margin={0}>
          <Child url={url} />
        </Page>
      </div>
      <Grid.Container gap={2} justify="center" className="border-box">
        <Grid xs={24} className="w-100"></Grid>
        <Grid xs={24}></Grid>
      </Grid.Container>
    </div>
  );
}
