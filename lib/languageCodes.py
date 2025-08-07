########################################################################
#
# A class to handle language codes
#
########################################################################
from pprint import pprint
import json

class LanguageCodes:
   
    #
    # Constructor
    # 
    def __init__(self, languages):
        self.codes = self.__set_codes(languages)
        self.countriesList = self.__set_country_list(languages)
   
    #
    # Get html options for the selected language
    #
    def get_language_options_html(self, currentLang, languages):
        options = ""
        for lang, overrides in languages.items():
            options = options + '<option value="' + lang + '"'
            if currentLang == lang:
                options = options + ' selected={true}'
            options = options + ' >'
            options = options + self.codes[lang] 
            options = options + '</option>'
        return options 

    #
    # Get country list
    #
    def get_country_list(self):
       return self.countriesList


    #
    # Get all language codes
    #
    def __set_codes(self,languages):
        codes = {}
        for lang, overrides in languages.items():
            codes[lang] = overrides["menu"]['locale']
        return codes

    #
    # Get all countries from en_GB
    #
    def __set_country_list(self,languages):
        countriesList = {}

        activeLangues = list(languages.keys())
        availableLanguages= languages['en_GB']['splash']['countries']['list'] 
        for i,lang in availableLanguages.items() :
          parts = lang.split(',')
          country = parts[0]
          locale = parts[1]
          if locale not in activeLangues :
                locale = ''
          countriesList[country] = locale 

        countriesStr=   json.dumps(countriesList, sort_keys=True)    
        return countriesStr

        

