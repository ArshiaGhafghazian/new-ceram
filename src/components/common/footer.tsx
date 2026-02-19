"use client"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import {useTranslations} from 'next-intl';

const Footer = () => {
      const t = useTranslations('HomePage');
    return (
        <footer>
            <div className='px-8 py-6 mx-auto max-w-350 md:px-16 grid grid-cols-1 md:grid-cols-3 text-gray-800 gap-12 md:gap-6 items-center'>
                <div className='mx-auto flex flex-col gap-2'>
                    <div>
                        <h3 className='font-semibold text-black mb-1 text-center inline-block md:text-start after:block after:w-full after:h-0.5 after:rounded-md after:bg-primary'>{t('contactInformation')}</h3>
                    </div>
                    <div className="flex flex-col">
                        <p><span className='text-black me-2 font-semibold text-justify'>دفتر مرکزی:</span>تهران، ولیعصر، بالاتر از چهار راه اسفندیار(نیایش)، خیابان سعیدی، پلاک 23، طبقه 2 واحد جنوبی</p>
                        <p><span className='text-black me-2 font-semibold text-justify'>تلفن:</span><a href="tel:+982122018352">22018352 - 021</a></p>
                    </div>
                    <div className="flex flex-col">
                        <p><span className='text-black me-2 font-semibold text-justify'>کارخانه:</span>قزوین شهرصنعتی البرز بلوار ابن سینای جنوبی نرسیده به لوازم خانگی پارس شرکت صنایع سرام آرا</p>
                        <p><span className='text-black me-2 font-semibold text-justify'>تلفن:</span><a href="tel:+982122018352">32244001 - 028</a></p>
                    </div>
                </div>
                <div className='mx-auto'>
                    <div className="flex justify-center items-center">
                        <div className="flex gap-3">
                            <Instagram className='cursor-pointer' />
                            <Linkedin className='cursor-pointer' />
                            <Facebook className='cursor-pointer' />
                            <Twitter className='cursor-pointer' />
                            <Instagram className='cursor-pointer' />
                            <Facebook className='cursor-pointer' />
                        </div>
                    </div>
                </div>
                <div className='mx-auto md:ms-auto'>
                    <Image  src="/logo web.png" alt="" className='w-32 md:w-44 grayscale' width={200} height={200}/>
                    {/* <img className='w-32 md:w-44 grayscale' src="/logo web.png" alt="" /> */}
                </div>
            </div>
        </footer>
    )
};

export default Footer;
