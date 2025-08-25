/*-------------------------------------------------------------------
|  🐼 React FC Input
|
|  🦝 Todo: Translate date & date-format
|
|     Usage: <LocalDate localeCode={localeCode} />
|
|  🐸 Returns:  Object
*-------------------------------------------------------------------*/

import { format } from 'date-fns';
import { useState, useEffect } from 'react';
// import { enIE, fr, de, es, nl } from 'date-fns/locale';

// Map browser locales to date-fns locales
const localeMap = {
  'en-IE': () => import('date-fns/locale/en-IE'),
  'fr-FR': () => import('date-fns/locale/fr'),
  'de-DE': () => import('date-fns/locale/de'),
  'es-ES': () => import('date-fns/locale/es'),
  'nl-NL': () => import('date-fns/locale/nl'),
  //Add more if needed
};

// const LocalDate = ({localeCode}) => {
//   console.log(localeCode);
//   const locale = localeMap[localeCode] || enIE;
//   return format(new Date(), 'PPP', { locale }); // e.g., "Aug 20, 2025"
// }

const LocalDate = ({ localeCode = 'en-IE' }) => {
  const [locale, setLocale] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadLocale = async () => {
      const importLocale = localeMap[localeCode] || localeMap['en-IE'];
      const module = await importLocale();
      if (isMounted) setLocale(module.default);
    };

    loadLocale();

    return () => {
      isMounted = false;
    };
  }, [localeCode]);

  if (!locale) return <span>Loading date...</span>;

  const formattedDate = format(new Date(), 'PPP', { locale });
  return <span>{formattedDate}</span>;
};


export default LocalDate;
