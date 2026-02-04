import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['fa', 'en' ,"ar" , "ru"],
 
  // Used when no locale matches
  defaultLocale: 'fa',
  localePrefix: 'always'
});