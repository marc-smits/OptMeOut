########################################################################
#
# A class to import translations from cvs files to json files
#
########################################################################
import json
import csv
import config
from pprint import pprint
from pathlib import Path
from lib.csvFormate import CsvFormate
from lib.csvImport.multipleParagraphs import MultipleParagraphs
class CvsImport:
  
  #
  # Constructor
  # 
  def __init__(self):
    self.currentLanguageToImport = ''
    
  #
  # Import all languages
  #  
  def importAll(self):
    languages = {}
    for langFile in Path(config.CSV_DIR+ '/import').glob("*.csv"):
        multipleParagraphs = MultipleParagraphs()
        translationsArr = {}
        with open(langFile, newline='') as csvFile:
          reader = csv.reader(csvFile, delimiter= config.CSV_FIELD_SEPARATOR, quotechar='|')
          index = 0
          for row in reader:
            if (index > 0):
              key = row[0];
              translation = row[2];
              if (multipleParagraphs.isMultipleParagraph(key)):
                key = multipleParagraphs.convertKey(key)
              self.__setTranslation(translationsArr, key, translation)
            index = index + 1
        result = translationsArr
        self.__setLanguageFromCsvFileName(langFile)
        jsonStr = json.dumps(result, indent = 4)
        self.__makeJsonFile(jsonStr)


  #
  # Set translation to translationsArr
  # 
  # Example:
  #  
  #
  def __setTranslation(self, translationsArr, key, translationValue):
      keys = key.split('.')
      rootKey = keys[0];
      # one dimensional array or end of multidimensional array
      if (len(keys)  == 1):
        translationsArr[key] =  CsvFormate.format_text_from_csv_to_json(translationValue)
      else:
        # multidimensional array
        if (translationsArr.get(rootKey) is None):
          translationsArr[rootKey] = {}
        keys.pop(0)
        subKeys = '.'.join(keys)
        translationsArr[rootKey] = self.__setTranslation(translationsArr[rootKey],subKeys, translationValue)
      return translationsArr

  #
  # Make json file from translation json
  # 
  def __makeJsonFile(self, jsonStr):
    lang = self.currentLanguageToImport
    languageDirs = [config.LANGUAGES_DIR ,config.PHP_API_LANGUAGES_DIR ]
    for languageDir in languageDirs:
      jsonDir = languageDir + '/'
      jsonFileName = jsonDir  + lang + '.json'
      with open(jsonFileName, "w") as f:
        f.write(jsonStr)

  #
  # set language by reading it from the CVS file name
  # 
  def __setLanguageFromCsvFileName(self, langFile):
    csvDirStr = config.CSV_DIR+ '/import/'
    langFileStr = langFile.as_posix()
    langFileStr = langFileStr.replace(csvDirStr, '')
    langFileStr = langFileStr.replace('.csv', '')
    self.currentLanguageToImport = langFileStr


