/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { SliderType } from '@/types/slider.type';
import { apiUrl, imageBaseUrl } from '@/configs/config';



const Slider: React.FC = () => {
    const pathname = usePathname()
    const isShowSlider = pathname === "/fa" || pathname === "/en"
    const [sliders, setSliders] = useState<SliderType[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const getSliders = async () => {
        const url = apiUrl + "sliders";
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            console.log(res.data.data);
            setSliders(res.data.data)

        } catch (error) {
            console.log(error);

        }
        setIsLoading(false)
    }

    useEffect(() => {
        getSliders()
    }, [])

    return (
        <>
            {isShowSlider && (<Swiper
                grabCursor={true}
                slidesPerView={"auto"}
                spaceBetween={2}
                // navigation={true}

                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000, // 5 seconds interval
                    disableOnInteraction: false // Continue autoplay even after user interaction
                }}
                loop={true}
                modules={[Navigation, Autoplay, Pagination]}
                className="mySwiper"
            >

                <SwiperSlide>
                    <img className='w-screen' src={`/sliders/slider_2.jpg`} alt="عکس" />

                </SwiperSlide>
                {sliders?.map((item, index) => (

                    <SwiperSlide key={`slider-${index}`} >
                        <img className='w-screen' src={imageBaseUrl + item.url} alt={imageBaseUrl + item.alt} />

                    </SwiperSlide>
                ))}



            </Swiper>)}
        </>



    )
}

export default Slider