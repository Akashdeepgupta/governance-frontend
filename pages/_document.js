import { Head, Html, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@8.0.0/themes/satellite-min.css"
          integrity="sha256-p/rGN4RGy6EDumyxF9t7LKxWGg6/MZfGhJM/asKkqvA="
          crossorigin="anonymous"
        ></link> */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/algolia-min.css"></link>
        <meta name="theme-color" content="#fff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
