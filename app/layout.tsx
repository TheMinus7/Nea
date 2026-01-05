import "./globals.css";
import Providers from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "ArchNea",
  icons: {
    icon: "/icon",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body>
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
