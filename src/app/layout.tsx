import type { Metadata } from "next";
import { siteConfig, socialConfig, assets } from "../lib/config";
import { colors, layout } from "../theme";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import "./globals.css";
import styles from "./layout.module.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.svg`,
  description: siteConfig.description,
  sameAs: [
    socialConfig.twitch.url,
    socialConfig.twitter.url,
    socialConfig.discord.url,
    socialConfig.youtube.url,
    socialConfig.instagram.url,
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - League of Legends Esports`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: assets.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [assets.ogImage],
  },
  icons: {
    icon: "/MaskedPanda_IconWhite.jpg",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate CSS variables for theme
  const cssVariables = {
    "--color-background": colors.background,
    "--color-foreground": colors.foreground,
    "--color-frostGrey": colors.frostGrey,
    "--color-frostBlue": colors.frostBlue,
    "--color-success": colors.success,
    "--color-error": colors.error,
    "--color-warning": colors.warning,
    "--color-info": colors.info,
    "--layout-maxWidth": layout.maxWidth,
    "--layout-sectionPadding": layout.sectionPadding,
  } as React.CSSProperties;

  return (
    <html lang="en">
      <body style={cssVariables}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div
          className={styles.app}
          style={{
            backgroundColor: colors.background,
            color: colors.foreground,
          }}
        >
          <SmoothScroll />
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
