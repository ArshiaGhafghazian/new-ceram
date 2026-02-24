import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";

const figtree = Figtree({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700", "700", "800", "900"],
});
const iranSansXFont = localFont({
  src: [
    {
      path: "../../../public/fonts/IranSansX/IRANSansXFaNum-Thin.woff",
      weight: "100",
    },
    {
      path: "../../../public/fonts/IranSansX/IRANSansXFaNum-Light.woff",
      weight: "300",
    },
    {
      path: "../../../public/fonts/IranSansX/IRANSansXFaNum-Medium.woff",
      weight: "500",
    },
    {
      path: "../../../public/fonts/IranSansX/IRANSansXFaNum-Regular.woff",
      weight: "400",
    },
    {
      path: "../../../public/fonts/IranSansX/IRANSansXFaNum-DemiBold.woff",
      weight: "600",
    },
    {
      path: "../../../public/fonts/IranSansX/IRANSansXFaNum-Bold.woff",
      weight: "700",
    },
    {
      path: "../../../public/fonts/IranSansX/IRANSansXFaNum-ExtraBold.woff",
      weight: "800",
    },
    {
      path: "../../../public/fonts/IranSansX/IRANSansXFaNum-Black.woff",
      weight: "900",
    },
  ],
  variable: "--font-iranSans",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: "fa" | "ar" | "en" | "ru" }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html
      lang={locale}
      className={`${iranSansXFont.variable} ${figtree.variable} ${
        locale === "fa" || locale === "ar" ? "font-iranSans" : "font-figtree"
      } font-medium text-md bg-gray-100/50`}
    >
      <body
        style={{
          direction: locale === "fa" || locale === "ar" ? "rtl" : "ltr",
        }}
        className={`min-h-screen grid grid-rows-[auto_1fr_auto] overflow-x-hidden text-gray-600`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
