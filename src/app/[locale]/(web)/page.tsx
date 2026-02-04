import {useTranslations} from 'next-intl';
 
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div className='mt-20'>

      <h1 className=''>{t('title')}</h1>
    </div>
  );
}