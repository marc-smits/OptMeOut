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
            if (index > 0 and self.__validate(row)):
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
  # Set translation to addressesArr
  # 
  # Example:
  #  
  #
  def __validate(self, row):

    valid = True
    # organization
    if(len(row[0]) > 40):
      valid = False
    
    # title
    if(len(row[1]) > 10):
      valid = False

      # name
    if(len(row[2]) > 20):
      valid = False

      # surname
    if(len(row[3]) > 20):
      valid = False

      # street
    if(len(row[4]) > 30):
      valid = False

      # number
    if(len(row[5]) > 10):
      pprint (row[5])
      valid = False

      # postal code
    if(len(row[6]) > 15):
      valid = False

      # city
    if(len(row[7]) > 25):
      valid = False

      # country
    if(len(row[8]) > 40):
      valid = False

    if (valid == False) :
      print (' ')
      print ('##########################################################################') 
      print (' ')
      print ('Adress below cannot be imported ')
      print (row)
      print (' ')
      print (' Check the rules below ') 
      print ('columns:  organization;title;name;surname;street;number;postal code;city;country')
      print (' max length organization:   40 ')
      print (' max length title:          10 ')
      print (' max length name:           20 ')
      print (' max length surname:        20 ')
      print (' max length street:         30 ')
      print (' max length number:         10')
      print (' max length postalCode:     15 ')
      print (' max length city:           25 ')
      print (' max length country         40 ')
      return False

    return True;
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


