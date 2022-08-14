import React, { FC, ReactElement } from "react";

import Head from "next/head";

import SITE from "../../../../config/Site";

import { HtmlHeadProps } from "./HtmlHead.props";

const HtmlHead: FC<HtmlHeadProps> = (
  _props: HtmlHeadProps,
): ReactElement<"div"> => {
  return (
    <Head>
      <title key="htmlTitle">Site</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${SITE.STATIC_URL}/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${SITE.STATIC_URL}/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${SITE.STATIC_URL}/favicon-16x16.png`}
      />
      <link
        rel="shortcut icon"
        href={`${SITE.STATIC_URL}/favicon.ico`}
        type="image/x-icon"
      />
      <link rel="manifest" href={`${SITE.STATIC_URL}/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${SITE.STATIC_URL}/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#352E3F" />
      <meta
        name="msapplication-TileImage"
        content={`${SITE.STATIC_URL}/images/app-icon/ms-icon-144x144.png`}
      />
      <meta name="theme-color" content="#352E3F" />
      <link
        href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta httpEquiv="cleartype" content="on" />
      <meta content="" name="keywords" />
      <meta content="" name="description" />
      <meta content="index,follow" name="robots" />
      <meta itemProp="name" content="" />
      <meta itemProp="description" content="" />
      <meta itemProp="url" content="" />
      <meta
        itemProp="image"
        content={`${SITE.STATIC_URL}/images/opc-sqr.jpg`}
      />
      <meta property="og:title" content="" />
      <meta property="og:description" content="" />
      <meta property="og:url" content="" />
      <meta
        property="og:image"
        content={`${SITE.STATIC_URL}/images/opc-sqr.jpg`}
      />
      <script src="https://www.google-analytics.com/analytics.js" />
    </Head>
  );
};

export default HtmlHead;
