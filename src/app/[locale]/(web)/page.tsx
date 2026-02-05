import Slider from '@/components/common/slider';
import HomeBlogItems from '@/components/pages/home/HomeBlogItems';
import HomeFilter from '@/components/pages/home/HomeFilter';
import HomeProductCategory from '@/components/pages/home/HomeProductCategory';
import HomeSummary from '@/components/pages/home/HomeSummary';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div className=''>
      <Slider />
      <HomeFilter />
      <HomeProductCategory />
      <HomeSummary />
      <HomeBlogItems />
      {/* <h1 className=''>{t('title')}</h1> */}
    </div>
  );
}