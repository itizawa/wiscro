import type { Metadata } from "next";

const DEFAULT_TITLE = "wiscro";
const DEFAULT_DESCRIPTION =
  "集合知を信じ、インターネットを通じて多くの人が知識やアイデアを共有できる環境を整えることで世界をより良くするための会社です。";
const DEFAULT_URL = "https://www.wiscro.app";
const DEFAULT_IMAGE = "https://www.wiscro.app/ogp.png";

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
      siteName: "Thread Note",
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
    metadataBase: new URL("https://www.thread-note.com"),
  };
};
