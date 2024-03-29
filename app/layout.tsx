import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover and share AI Prompts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
