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
from lib.csvImport.multipleParagraphs import MultipleParagraphs


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
    
  #
  # Make csv content from translation arrays
  # 
  def __makeCsvContent(self, valuesArr):
    csv = "Key,English,Translation (" + self.currentLanguageToExport.upper() + ")\n"
    multipleParagraphs = MultipleParagraphs()

    for key in valuesArr:
      csvKey = key
      if (multipleParagraphs.isMultipleParagraph(csvKey)):
        csvKey = multipleParagraphs.convertCsvKey(csvKey)
      csv = csv +  csvKey + config.CSV_FIELD_SEPARATOR
      csv = csv + valuesArr[key] + config.CSV_FIELD_SEPARATOR
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

