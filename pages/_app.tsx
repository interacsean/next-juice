import React from "react";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/provider";
import HtmlHead from "../web/components/modules/HtmlHead";
import chakraTheme from "../web/theme/chakraTheme";
import { useAnalytics } from "../web/services/analytics/useAnalytics";
import MainLayout from "../web/components/layouts/MainLayout";

function MyApp({ Component, pageProps }) {
  useAnalytics();

  return (
    <RecoilRoot>
      <ChakraProvider theme={chakraTheme}>
        <>
          {/*<HtmlHead />*/}
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
