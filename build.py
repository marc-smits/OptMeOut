import json
import config

from pathlib import Path
from lib.cvsImport import CvsImport
from lib.addressImport import AddressImport
from lib.translationsExport import TranslationsExport
from lib.addressesExport import AddressesExport
from lib.htmlGenerator import HtmlGenerator


if __name__ == "__main__":
    addressImport = AddressImport()
    addressImport.importAll()
    cvsImport = CvsImport()
    cvsImport.importAll()
    htmlGenerator = HtmlGenerator()
    htmlGenerator.generate()
    translationsExport = TranslationsExport()
    translationsExport.exportAll()
    addressesExport = AddressesExport()
    addressesExport.exportAll()

   
  