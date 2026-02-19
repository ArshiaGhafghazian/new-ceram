import Footer from "@/components/common/footer";
import TopMenu from "@/components/common/top-menu";
import { ReactNode } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Props = {
    children: ReactNode;
  params: Promise<{ locale: "fa" | "ar" | "en" | "ru" }>;
};

export default async function Layout({
    children,
      params
}: Props) {
      const { locale } = await params;
    return (
        <div className="bg-background">
            <TopMenu locale={locale} />
            <main>

                {children}
            </main>
            <Footer />
        </div>
    )
}