"use client";

import { useEffect, useState } from "react";

type OgpData = {
  title: string | null;
  description: string | null;
  image: string | null;
  favicon: string | null;
};

export default function OgpCard({ url }: { url: string }) {
  const [data, setData] = useState<OgpData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/ogp?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() =>
        setData({ title: url, description: null, image: null, favicon: null }),
      )
      .finally(() => setIsLoading(false));
  }, [url]);

  if (isLoading) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          overflow: "hidden",
          maxWidth: 600,
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              padding: 16,
              flex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 16,
                background: "#e0e0e0",
                borderRadius: 2,
                animation: "pulse 1.5s infinite",
              }}
            />
            <div
              style={{
                width: 80,
                height: 14,
                background: "#e0e0e0",
                borderRadius: 2,
                animation: "pulse 1.5s infinite",
              }}
            />
          </div>
          <div
            style={{
              width: 120,
              height: 100,
              background: "#e0e0e0",
              animation: "pulse 1.5s infinite",
            }}
          />
        </div>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        overflow: "hidden",
        maxWidth: 600,
        textDecoration: "none",
        color: "inherit",
        backgroundColor: "#fff",
        transition: "opacity 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: 16,
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: "bold",
              fontSize: 14,
              color: "#1a1a1a",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {data?.title}
          </p>
          {data?.description && (
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "#666",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {data.description}
            </p>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginTop: "auto",
            }}
          >
            {data?.favicon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.favicon}
                alt="favicon"
                style={{ width: 12, height: 12 }}
              />
            )}
            <p
              style={{
                margin: 0,
                fontSize: 11,
                color: "#999",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {new URL(url).hostname}
            </p>
          </div>
        </div>
        {data?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.image}
            alt={data?.title || url}
            style={{ width: 120, height: 100, objectFit: "cover" }}
          />
        )}
      </div>
    </a>
  );
}
