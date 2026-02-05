import Footer from "@/components/common/footer";
import TopMenu from "@/components/common/top-menu";
import { ReactNode } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Props = {
    children: ReactNode;
};

export default async function Layout({
    children,
}: Props) {
    return (
        <div className="bg-background">
            <TopMenu />
            <main>

                {children}
            </main>
            <Footer />
        </div>
    )
}