########################################################################
#
# A class to export translations json to cvs and javascript files
#
########################################################################

import json
import config
from pprint import pprint
from pathlib import Path
from lib.csvFormate import CsvFormate


class TranslationsExport:
  
  #
  # Constructor
  # 
  def __init__(self):
    # englishArr ia used as a column to be translated in the
    # current language
    self.englishArr = self.__setEnglishArr()
    self.currentLanguageToExport = ''
    
  #
  # Export all languages
  #  
  def exportAll(self):
    languages = {}
    for langFile in Path(config.LANGUAGES_DIR).glob("*.json"):
        with open(langFile, "r") as f:
          languages[langFile.stem] = json.load(f)
    for lang, translations in languages.items():
      self.currentLanguageToExport = lang
      self._exportLanguage(translations)

  #
  # Set the array of english translations
  # This will be as a source translation in csv files
  #  
  def __setEnglishArr(self):
    self.englishArr = {}
    languagesDirStr = str(config.LANGUAGES_DIR)
    langFile = languagesDirStr + "/en_GB.json"
    with open(langFile, "r") as f:
      translationsJson = json.load(f)
    return self.__getTranslationsArray(self.englishArr, '', translationsJson)

  #
  # Export the json of one language
  # 
  def _exportLanguage(self, translationsJson):
    valuesArr = {};
    templateKey = list(translationsJson)[0]
    valuesArr = self.__getTranslationsArray(valuesArr, '', translationsJson)
    
    csvStr = self.__makeCsvContent(valuesArr)
    self.__makeCsvFile(csvStr)
    self.__makeJsFile(valuesArr)
    
  #
  # Make csv content from translation arrays
  # 
  def __makeCsvContent(self, valuesArr):
    csv = "Key,English,Translation (" + self.currentLanguageToExport.upper() + ")\n"
    for key in self.englishArr:
      csv = csv +  key + config.CSV_FIELD_SEPARATOR
      csv = csv + self.englishArr[key] + config.CSV_FIELD_SEPARATOR
      value = valuesArr.get(key)
      if ( isinstance(value, str)):
        csv = csv + value + "\n"
      else:   
        csv = csv + "\n"
    return csv



  #
  # Make csv file from translation arrays
  # 
  def __makeCsvFile(self, csvStr):
    csvStr =  CsvFormate.format_text_from_json_to_csv(csvStr)
    lang = self.currentLanguageToExport
    csvDir = config.CSV_DIR + '/export/'
    csvFileName = csvDir + lang + '.csv'
    with open(csvFileName, "w") as f:
      f.write(csvStr)
  
  #
  # Make javascript file from translation arrays
  # 
  # Example:
  # let translationsJson='{"pageTitle": "Compose Your Letter", "previous": "Previous", "next": "Next", "step1.pertires.address.title": "Address"}'; 
  # let  globalTranslationsObj = JSON.parse(translationsJson); 
  # function _trns(translation){return(globalTranslationsObj[translation]);}
  # 
  def __makeJsFile(self, translationsArr):
    return
    jsonStr = json.dumps(translationsArr)
    lang = self.currentLanguageToExport
    script =  "let translationsJson='" + jsonStr + "';"
    script = script + " let  globalTranslationsObj = JSON.parse(translationsJson);"
    script = script + " function _trns(translation){return(globalTranslationsObj[translation]);}"
    jsDir = config.JS_DIR + '/'
    jsFileName = jsDir + lang + '.js'
    with open(jsFileName, "w") as f:
      f.write(script)

   
  #
  # Get translations array from the json
  # example
  #   'step1':
  #     { 
  #       'title': 'titel',
  #       'properties':{
  #         'name' : 'Naam', 
  #         'address': 'Adres
  #     }
  # }
  # 
  #  This fills the replacements:
  #   {
  #     'step1.title' : 'titel',
  #     'step1.properties.name' : 'Naam',
  #     'step1.properties.address' : 'Adres'
  #   }
  #  
  # 
  def __getTranslationsArray(self, translationsJson,  baseKey, itemsJson):
    for key in itemsJson.keys():
      arrayKey =  baseKey + key 
      value = itemsJson[key]
      if ( isinstance(value, str)):
        translationsJson[arrayKey] = value
      else:
          if (baseKey != ""):
              subKey = baseKey  + key + "."
          else:
            subKey = key + "."
          translationsJson = self.__getTranslationsArray(translationsJson, subKey, value)
    return translationsJson

