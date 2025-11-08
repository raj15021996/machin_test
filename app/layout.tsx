import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/LayoutComponents/Header/Header"
import Head from "next/head"
import Layout from "@/components/LayoutComponents/Layout"


export const metadata: Metadata = {
  title: "Test Website",
  description: "This is test website",
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "favicon.ico",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
       <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
      <body>
        <Header />
          <Layout>
            {children}
          </Layout> 
      </body>
    </html>
  )
}
