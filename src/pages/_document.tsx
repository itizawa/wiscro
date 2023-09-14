import React from 'react';
import Document, { Html, Main, NextScript, DocumentContext } from 'next/document';
import Head from 'next/head';

class DocumentPage extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Wiscro</title>
          <meta name="description" content="Wiscro is wisdom crowd" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default DocumentPage;
