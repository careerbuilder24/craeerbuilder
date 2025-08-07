// 'use client';

// import { AuthContextProvider } from "./context/AuthContext";
// import localFont from "next/font/local";
// import "./globals.css";

// // Load fonts with next/font/local for better performance
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased suppressHydrationWarning`}>
//         <AuthContextProvider>
//           {children}
//         </AuthContextProvider>
//       </body>
//     </html>
//   );
// }


// app/layout.js

import { AuthContextProvider } from "./context/AuthContext";
import localFont from "next/font/local";
import "./globals.css";
import { Metadata } from "next";

// Load local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Global SEO metadata
export const metadata = {
  title: "Career Builder - Build Your Dream Career",
  description: "Explore expert resources, job tips, and educational content to build your career effectively.",
  keywords: ["career builder", "job tips", "career development", "education", "career advice"],
  metadataBase: new URL("https://craeerbuilder.vercel.app"),
  openGraph: {
    title: "Career Builder - Your Guide to Career Growth",
    description: "Explore expert career-building tips and resources.",
    url: "https://craeerbuilder.vercel.app",
    siteName: "Career Builder",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Builder",
    description: "Explore expert resources, job tips, and educational content to build your career.",
  },
  verification: {
    google: "JIbZKrPfCJNylwsne6R8FT4toE9p_jP3CnyaWJ-Fu1s",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
