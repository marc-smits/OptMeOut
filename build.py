import json
from pathlib import Path

import config
from lib.addressesExport import AddressesExport
from lib.addressImport import AddressImport
from lib.cvsImport import CvsImport
from lib.htmlGenerator import HtmlGenerator
from lib.translationsExport import TranslationsExport

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
