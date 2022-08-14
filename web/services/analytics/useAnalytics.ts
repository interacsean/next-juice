import { useRouter } from "next/router";
import React from "react";
import Analytics from "../../../config/Analytics";

export const useAnalytics = () => {
  const router = useRouter();
  React.useEffect(() => {
    let handleRouteChange = (url: string) => {};
    if (Analytics.ENABLE_TRACKING && Analytics.GA_TRACKING_ID) {
      // @ts-ignore
      const googleAnalytics = window?.ga;
      if (typeof googleAnalytics === "function" && Analytics?.GA_TRACKING_ID) {
        googleAnalytics("create", Analytics?.GA_TRACKING_ID, "auto");
        // @ts-ignore (ignores querystring)
        const page = document.location.pathname;
        googleAnalytics("send", "pageview", page);
      }

      handleRouteChange = (url: string) => {
        const page = url.replace(/\?.*/, "");
        if (typeof googleAnalytics === "function") {
          googleAnalytics("send", "pageview", page);
        }
      };
      router.events.on("routeChangeStart", handleRouteChange);
    }
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
};
