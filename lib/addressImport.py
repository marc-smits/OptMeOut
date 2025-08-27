########################################################################
#
# A class to import addresses from cvs files to a json file
#
########################################################################
import json
import csv
import config
from pprint import pprint
from pathlib import Path
from lib.csvFormate import CsvFormate

class AddressImport:
  
  #
  # Constructor
  # 
  def __init__(self):
    self.currentLanguageToImport = ''
    
  #
  # Import all addresses
  #  
  def importAll(self):
    languages = {}
    for langFile in Path(config.ADDRESSES_CSV_DIR + '/import').glob("*.csv"):
        addressesArr = {}
        with open(langFile, newline='') as csvFile:
          reader = csv.reader(csvFile, delimiter= config.CSV_FIELD_SEPARATOR, quotechar='|')
          index = 0
          for row in reader:
            if (index > 0):
              self.__setAddress(index,addressesArr, row)
            index = index + 1
        result = addressesArr
        self.__setLanguageFromCsvFileName(langFile)
        jsonStr = json.dumps(result, indent = 4)
        self.__makeJsonFile(jsonStr)


  #
  # Set translation to addressesArr
  # 
  # Example:
  #  
  #
  def __setAddress(self, index, addressesArr, row):
    addressesArr[index] = {
      "organization" :row[0],
      "title" :row[1],
      "name" :row[2],
      "surname" :row[3],
      "street" :row[4],
      "number" :row[5],
      "postalCode" :row[6],
      "city" :row[7],
      "country" :row[8]
    }  
    return addressesArr

  #
  # Make json files from translation json
  # 
  def __makeJsonFile(self, jsonStr):
    lang = self.currentLanguageToImport

    jsonDir = config.ADDRESSES_API_DIR + '/'  
    jsonFileName = jsonDir  + lang + '.json'
    with open(jsonFileName, "w") as f:
      f.write(jsonStr)

  #
  # set language by reading it from the CVS file name
  # 
  def __setLanguageFromCsvFileName(self, langFile):
    csvDirStr = config.ADDRESSES_CSV_DIR + 'import/'
    langFileStr = langFile.as_posix()
    langFileStr = langFileStr.replace(csvDirStr, '')
    langFileStr = langFileStr.replace('.csv', '')
    self.currentLanguageToImport = langFileStr


