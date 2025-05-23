import type { Metadata } from "next";
import Header from "@/components/shared/header";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Footer from "@/components/shared/footer";
import StoreProvider from "@/store/storeProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";


export const metadata: Metadata = {
  title: "Next Store",
  description: "Generated by create next app",
};

// 👇 Делаем layout асинхронным и получаем локаль и сообщения
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = await getMessages({ locale: params.locale });
  } catch (error) {
    console.error(error);

    notFound();
  }

  return (
    <html lang={params.locale}>
      <body
      >
        <StoreProvider>

          <NextIntlClientProvider locale={params.locale} messages={messages}>

            <Header />
            {children}
            <Footer />
            <Toaster
              position="top-center"
              reverseOrder={false}
            />

          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
