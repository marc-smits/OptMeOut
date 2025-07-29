import json
import config

from pathlib import Path
from lib.cvsImport import CvsImport
from lib.translationsExport import TranslationsExport
from lib.htmlGenerator import HtmlGenerator


if __name__ == "__main__":
    cvsImport = CvsImport()
    cvsImport.importAll()
    htmlGenerator = HtmlGenerator()
    htmlGenerator.generate()
    translationsExport = TranslationsExport()
    translationsExport.exportAll()

   
  