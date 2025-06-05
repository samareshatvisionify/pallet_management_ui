import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StyledComponentsRegistry, AntdProvider } from "../lib";
import { MainLayout } from "@/components";
import ReduxProvider from "@/store/ReduxProvider";
import '@ant-design/v5-patch-for-react-19';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VisionAI Pallet Management",
  description: "AI-powered pallet management and analytics system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <StyledComponentsRegistry>
            <AntdProvider>
              <MainLayout>
                {children}
              </MainLayout>
            </AntdProvider>
          </StyledComponentsRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
