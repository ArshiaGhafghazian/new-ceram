import { Button } from '@/components/ui/button';
import ToastProvider from '@/providers/toastProvider';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { ReactNode } from 'react';


type Props = {
    children: ReactNode;
};

export default function DashbaordLayout({ children }: Props) {
    return (
        <>
            <div className=' bg-gray-200 min-h-screen overflow-hidden'>
                <div className='flex'>

                    <div className='grow '>
                        {/* <DashboardHeader handleMenuToggle={handleMenuToggle} /> */}
                        <div className='flex justify-between px-8  bg-primary items-center py-2 border-b text-white'>
                            <Button variant="secondary" size="icon"><Menu className='size-4' /></Button>
                              <Image  src="/logo web.png" alt="" className='w-18 md:w-18 grayscale' width={200} height={200}/>
                        </div>
                        <main className="md:px-4 md:py-8">{children}</main>
                    </div>

                </div>


            </div>

            <ToastProvider />

        </>
    );
}
