import Footer from "@/components/common/footer";
import TopMenu from "@/components/common/top-menu";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

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