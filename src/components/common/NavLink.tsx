'use client';

import { Link } from '@/i18n/navigation';
import { useSelectedLayoutSegment } from 'next/navigation';
import { ComponentProps } from 'react';


export default function NavLink({ href, ...rest }: ComponentProps<typeof Link>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={`${isActive ? `text-white bg-primary rounded px-2 py-1 shadow-md transition-all` : `relative hover:underline-none after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:bg-primary after:w-0 hover:after:w-full after:transition-all after:duration-300`}`}


      href={href}
      {...rest}
    />
  );
}
