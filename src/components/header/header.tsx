"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link as MuiLink,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const CONTACT_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeNmuXo7-05iU_m5ge4pq_1pysVTqcis8JWOgrupso1foOZpw/viewform?usp=dialogo";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    setDrawerOpen(false);

    if (!isHomePage) {
      window.location.href = `/#${targetId}`;
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 64;
      const elementPosition = targetElement.offsetTop - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "代表紹介", id: "representative" },
    { label: "コンテンツ", id: "blogs", href: "/blog" },
    { label: "つぶやき", id: "posts", href: "/posts" },
    { label: "概要", id: "company-overview" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#f9fafb",
        color: "text.primary",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1152px",
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 3, lg: 4 },
          height: 64,
          justifyContent: "space-between",
        }}
      >
        <Link href="/">
          <img src="/logo-with-letter.png" alt="wiscro" width={120} />
        </Link>

        {/* Desktop nav */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 4,
          }}
        >
          {navLinks.map((link) =>
            link.href ? (
              <Link
                key={link.id}
                href={link.href}
                style={{ textDecoration: "none" }}
              >
                <MuiLink
                  component="span"
                  underline="none"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "text.primary" },
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </MuiLink>
              </Link>
            ) : (
              <MuiLink
                key={link.id}
                href={`/${link.id}`}
                underline="none"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "text.primary" },
                  cursor: "pointer",
                }}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  handleLinkClick(e, link.id)
                }
              >
                {link.label}
              </MuiLink>
            ),
          )}
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#1565c0",
                "&:hover": { bgcolor: "#0d47a1" },
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              お問い合わせ
            </Button>
          </a>
        </Box>

        {/* Mobile hamburger */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: "text.secondary" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: "80%", maxWidth: 384, pt: 2 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 2,
            px: 2,
          }}
        >
          {navLinks.map((link) =>
            link.href ? (
              <Link
                key={link.id}
                href={link.href}
                style={{ textDecoration: "none" }}
                onClick={() => setDrawerOpen(false)}
              >
                <MuiLink
                  component="span"
                  underline="none"
                  sx={{
                    px: 1.5,
                    py: 1,
                    borderRadius: 1,
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "text.secondary",
                    "&:hover": { color: "text.primary", bgcolor: "#f9fafb" },
                  }}
                >
                  {link.label}
                </MuiLink>
              </Link>
            ) : (
              <MuiLink
                key={link.id}
                href={`/${link.id}`}
                underline="none"
                sx={{
                  px: 1.5,
                  py: 1,
                  borderRadius: 1,
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "text.secondary",
                  "&:hover": { color: "text.primary", bgcolor: "#f9fafb" },
                }}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  handleLinkClick(e, link.id)
                }
              >
                {link.label}
              </MuiLink>
            ),
          )}
          <Box sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
            <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#1565c0",
                  "&:hover": { bgcolor: "#0d47a1" },
                  fontWeight: "bold",
                  px: 4,
                  textTransform: "none",
                }}
              >
                お問い合わせ
              </Button>
            </a>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
