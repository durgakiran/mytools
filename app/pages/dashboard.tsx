import { Button, Grid, Input, Page } from "@geist-ui/core";
import { useEffect, useState } from "react";
import getContentFromCache from "../core/utils/getContentFromCache";
import validUrl from "../core/utils/validUrl";

const Child = ({ url }: { url: string }) => {
  const [cachedContent, setCachedContent] = useState<string>();
  
  const fetchResponse = async () => {
    const content = await getContentFromCache();
    setCachedContent(content);
  };

  useEffect(() => {
      if (validUrl(url)) {
          fetchResponse();
      }
  }, [url]);

  if (cachedContent) {
    return <div dangerouslySetInnerHTML={{ __html: cachedContent }}></div>;
  }
  return (
    <>
      <h2>Hello, Everyone.</h2>
      <p>This is a simulated page, you can click anywhere to close it.</p>
    </>
  );
};

export default function Dashboard() {
  const [url, setUrl] = useState("");

  return (
    <div className="dashboard__wrapper">
      <Grid.Container gap={2} justify="center">
        <Grid xs={24}>
          <div className="m-4">
            <form>
              <Input placeholder="enter your url" />
              <Button auto ml={1}>
                Go
              </Button>
            </form>
          </div>
        </Grid>
        <Grid xs={24}>
          <Page>
            <Child url={""} />
          </Page>
        </Grid>
      </Grid.Container>
    </div>
  );
}
