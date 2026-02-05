"use client"
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const productsData = [
	{
		img: "/pics/products/pink.jpg",
		title: "محصولات استخری",
	},
	{
		img: "/pics/products/pink.jpg",
		title: "محصولات متری",
	},
	{
        img: "/pics/products/pink.jpg",
		title: "محصولات چوبی",
	},
	{
		img: "/pics/products/pink.jpg",
		title: "محصولات دیگری",
	},

	{
		img: "/pics/products/pink.jpg",
		title: "محصولات متری",
	},
	{
		img: "/pics/products/pink.jpg",
		title: "محصولات چوبی",
	},
];


const HomeProductCategory = () => {
  return (
    <div className='w-screen max-w-350 mx-auto px-8 md:px-16'>
    <div className=' w-full mx-auto'>
        <div className='mx-auto max-w-350 overflow-hidden'>
            <Swiper
                grabCursor={true}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                // loop={true}
                modules={[Autoplay]}
                className='mySwiper my-10 '
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },

                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },

                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },

                    1440: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
            >
                {productsData.map((slider, index) => (
                    <SwiperSlide key={index} className='w-[320px] mx-auto '>
                        <div className='flex flex-col gap-4 justify-center items-center text-justify'>
                            <img
                                src={slider.img}
                                alt='test'
                                className='hover:scale-105 transition-all object-cover w-[320px] h-[320px]'
                            />
                            <h2 className='font-bold text-lg text-black'>{slider.title}</h2>
                            <p className='line-clamp-1'>بخش محصولات استخری</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
</div>
  )
};

export default HomeProductCategory;
