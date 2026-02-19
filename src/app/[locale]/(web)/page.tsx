import Slider from '@/components/common/slider';
import HomeBlogItems from '@/components/pages/home/HomeBlogItems';
import HomeFilter from '@/components/pages/home/HomeFilter';
import HomeProductCategory from '@/components/pages/home/HomeProductCategory';
import HomeSummary from '@/components/pages/home/HomeSummary';


export default function HomePage() {

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