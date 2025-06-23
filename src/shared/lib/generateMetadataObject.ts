import type { Metadata } from "next";

const DEFAULT_TITLE = "wiscro";
const DEFAULT_DESCRIPTION =
  "人が集まる会社づくり、始めませんか？深谷在住エンジニアだからできる、顔の見える採用支援";
const DEFAULT_URL = "https://wiscro.app";
const DEFAULT_IMAGE = "https://wiscro.app/eye-catch.png";

type Args = {
  title?: string;
  description?: string;
  url?: string;
  images?: string[];
};

export const generateMetadataObject = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  url = DEFAULT_URL,
  images = [DEFAULT_IMAGE],
}: Args = {}): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "wiscro",
      locale: "ja_JP",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@",
      creator: "@",
    },
    metadataBase: new URL("https://wiscro.app"),
  };
};
