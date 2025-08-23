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
import { enIE, fr, de, es, nl } from 'date-fns/locale';

// Map browser locales to date-fns locales
const localeMap = {
  'en-IE': enIE,
  'fr-FR': fr,
  'de-DE': de,
  'es-ES': es,
  'nl-nl': nl,
  //Add more if needed
};

const LocalDate = ({localeCode}) => {
  console.log(localeCode);
  const locale = localeMap[localeCode] || enIE;
  return format(new Date(), 'PPP', { locale }); // e.g., "Aug 20, 2025"
}

export default LocalDate;
