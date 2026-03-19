########################################################################
#
# A class to export addresses json 
#
########################################################################

import json
import config
from pprint import pprint
from pathlib import Path
from lib.csvFormate import CsvFormate


class AddressesExport:
  
  #
  # Constructor
  # 
  def __init__(self):
    self.currentLanguageToExport = ''
    
  #
  # Export all addresses
  #  
  def exportAll(self):
    addresses = {}
    for addressesFile in Path(config.ADDRESSES_API_DIR).glob("*.json"):
        with open(addressesFile, "r") as f:
          addresses[addressesFile.stem] = json.load(f)
    for lang, addresses in addresses.items():
      self.currentLanguageToExport = lang
      self._exportLanguage(addresses)

  #
  # Export the json of one language
  # 
  def _exportLanguage(self, addressesJson):
    valuesArr = {};
    csvStr = self.__makeCsvContent(addressesJson)
    self.__makeCsvFile(csvStr)
    
  #
  # Make csv content from translation arrays
  # 
  def __makeCsvContent(self, valuesArr):
    csv = "organization;title;name;surname;street;number;postal code;city;country\n"
    for key , row in valuesArr.items():
      csvRow = row["organization"] + ";" 
      csvRow = csvRow  + row["title"]  + ";" 
      csvRow = csvRow + row["name"]  + ";" 
      csvRow = csvRow + row["surname"]  + ";" 
      csvRow = csvRow + row["street"]  + ";" 
      csvRow = csvRow + row["number"]  + ";" 
      csvRow = csvRow + row["postalCode"]  + ";" 
      csvRow = csvRow + row["city"]  + ";" 
      csvRow = csvRow + row["country"]  
      csv = csv + csvRow + "\n"
    return csv

  #
  # Make csv file from translation arrays
  # 
  def __makeCsvFile(self, csvStr):
    csvStr =  CsvFormate.format_text_from_json_to_csv(csvStr)
    lang = self.currentLanguageToExport
    csvDir = config.ADDRESSES_CSV_DIR + '/export/'
    csvFileName = csvDir + lang + '.csv'
    with open(csvFileName, "w") as f:
      f.write(csvStr)


