import { memo } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_SHORT_NAME,
  NEXT_PUBLIC_APP_URL,
} from "@/env";
import { ReduxProvider } from "../providers/Redux/provider";
import ReactQueryWrapper from "../providers/ReactQuery/reactQueryWrapper";
import AppProvider from "@/components/appProvider";

// list of style files

import "@/assets/globals.scss";

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  applicationName: APP_SHORT_NAME,
  title: {
    default: APP_NAME,
    template: APP_DESCRIPTION,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_SHORT_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_SHORT_NAME,
    title: {
      default: APP_NAME,
      template: APP_DESCRIPTION,
    },
    description: APP_DESCRIPTION,
    images: ["/icon/logo/192.png"],
  },
  twitter: {
    card: "summary",
    description: APP_DESCRIPTION,
    title: {
      default: APP_NAME,
      template: APP_DESCRIPTION,
    },
    images: ["/icon/logo/192.png"],
  },
  // icons: [
  //   { rel: "apple-touch-icon", url: "/icon/logo/apple-touch-icon.png" },
  //   {
  //     rel: "shortcut icon",
  //     url: "/icon/logo/favicon.ico",
  //     type: "image/x-icon",
  //   },
  // ],
  keywords: ["learning", "business"],
};

export const viewport: Viewport = {
  themeColor: "#00429E",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  height: "device-height",
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

function ZabanshenasAcademy() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={APP_NAME} />
        <meta property="og:site_name" content={APP_SHORT_NAME} />
        <meta property="og:url" content={NEXT_PUBLIC_APP_URL} />
        <meta property="og:description" content={APP_DESCRIPTION} />
        <meta property="og:image" content="/icon/logo/apple-touch-icon.png" />

        <link
          rel="shortcut icon"
          href="/icon/logo/favicon.ico"
          type="image/x-icon"
        />

        <link rel="apple-touch-icon" href="/icon/logo/apple-touch-icon.png" />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icon/logo/apple-touch-icon-57x57.png"
        />

        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="application-name" content={APP_SHORT_NAME} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="red" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0, viewport-fit=cover"
        />
        <meta
          name="keywords"
          content="آموزش,آموزش زبان,زبان انگلیسی,آموزش زبان انگلیسی,اپلیکیشن آموزش زبان,اپلیکیشن یادگیری زبان,نرم افزار آموزش زبان,نرم افزار یادگیری زبان,Learn,English,zaban amooz,zabanshenas"
        />

        <link
          as="font"
          type="font/ttf"
          rel="preconnect"
          crossOrigin="anonymous"
          href="/assets/font/fonts/comme/Comme-Bold.ttf"
        />

        <link
          as="font"
          type="font/ttf"
          rel="preconnect"
          crossOrigin="anonymous"
          href="/assets/font/fonts/comme/Comme-Medium.ttf"
        />

        <link
          as="font"
          type="font/ttf"
          rel="preconnect"
          crossOrigin="anonymous"
          href="/assets/font/fonts/iran-sans/IRANSansWeb_Medium.woff"
        />

        <link
          as="font"
          type="font/ttf"
          rel="preconnect"
          crossOrigin="anonymous"
          href="/assets/font/fonts/iran-sans/IRANSansWeb_Bold.woff"
        />
      </head>
      <body>
        <ReduxProvider>
          <ReactQueryWrapper>
            <AppProvider />
            <ReactQueryDevtools />
          </ReactQueryWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}

export default memo(ZabanshenasAcademy);
