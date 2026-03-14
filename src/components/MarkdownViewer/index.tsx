import { Typography } from "@mui/material";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

export const MarkdownViewer: React.FC<{ body: string }> = ({ body }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        h1: ({ children }) => (
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ borderBottom: "1px solid #e5e7eb", pb: 1 }}
          >
            {children}
          </Typography>
        ),
        h2: ({ children }) => (
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ borderBottom: "1px solid #e5e7eb", pb: 0.5, mt: 6 }}
          >
            {children}
          </Typography>
        ),
        h3: ({ children }) => (
          <Typography variant="h6" fontWeight={600} sx={{ mt: 4 }}>
            {children}
          </Typography>
        ),
        p: ({ children }) => (
          <Typography sx={{ color: "#111827" }}>{children}</Typography>
        ),
        ul: ({ children }) => (
          <ul
            style={{
              listStyleType: "disc",
              marginLeft: 20,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol
            style={{
              listStyleType: "decimal",
              marginLeft: 20,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li style={{ color: "#111827" }}>{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote
            style={{
              borderLeft: "4px solid #9ca3af",
              paddingLeft: 16,
              fontStyle: "italic",
              color: "#4b5563",
            }}
          >
            {children}
          </blockquote>
        ),
        pre: ({ children }) => (
          <pre
            style={{
              backgroundColor: "#111827",
              color: "white",
              padding: 12,
              borderRadius: 6,
              fontSize: "0.875rem",
              overflowX: "auto",
            }}
          >
            {children}
          </pre>
        ),
        code: ({ children }) => (
          <code
            style={{
              paddingLeft: 4,
              paddingRight: 4,
              paddingTop: 2,
              paddingBottom: 2,
              borderRadius: 4,
              fontSize: "0.875rem",
            }}
          >
            {children}
          </code>
        ),
        table: ({ children }) => (
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid #d1d5db",
            }}
          >
            {children}
          </table>
        ),
        thead: ({ children }) => (
          <thead style={{ backgroundColor: "#e5e7eb" }}>{children}</thead>
        ),
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => (
          <tr style={{ borderBottom: "1px solid #e5e7eb" }}>{children}</tr>
        ),
        th: ({ children }) => (
          <th
            style={{
              border: "1px solid #d1d5db",
              padding: "8px 16px",
              textAlign: "left",
              fontWeight: 600,
            }}
          >
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td
            style={{
              border: "1px solid #d1d5db",
              padding: "8px 16px",
            }}
          >
            {children}
          </td>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#3b82f6", textDecoration: "underline" }}
          >
            {children}
          </a>
        ),
        img: ({ src, alt }: { src?: unknown; alt?: string }) => {
          if (typeof src !== "string" || src.length === 0) return null;
          return (
            <Image
              src={src}
              alt={alt ?? ""}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 768px"
              style={{ height: "auto", maxWidth: "100%" }}
            />
          );
        },
      }}
    >
      {body}
    </ReactMarkdown>
  );
};
