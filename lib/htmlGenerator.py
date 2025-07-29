########################################################################
#
# A class to generate html from templates and fill the translations
#
########################################################################
import json
import config
import shutil   
from pprint import pprint
from pathlib import Path
from lib.translate import Translate
from lib.languageCodes import LanguageCodes

class HtmlGenerator:
  
  
    #
    # Constructor
    # 
    def __init__(self):
        self.languages = self.__get_configured_languages()
        self.languageCodes = LanguageCodes(self.languages)
        self. __generate_language_folders()

       
    # Generate HTML files
    def generate(self):
      
      self.__copy_react_root_files()
      self.__generateLanguageTemplates(config.SRC_TEMPLATE_PATH + '/index.html')
      self.__generateLanguageTemplates(config.SRC_TEMPLATE_PATH + '/rootIndex.html')
      path = config.SRC_TEMPLATE_PATH + '/src'
      self.__crawl(path)
      #self.__set_default_index()
      return    

    #
    # Get the the configured languages 
    #
    def __get_configured_languages(self):
        
        languages = {}
        for lang_file in Path(config.LANGUAGES_DIR).glob("*.json"):
          with open(lang_file, "r") as f:
              languages[lang_file.stem] = json.load(f)
        return languages

    #
    # Generate language folders 
    #
    def __generate_language_folders(self):
        
        languages = {}
        for lang_file in Path(config.LANGUAGES_DIR).glob("*.json"):
          with open(lang_file, "r") as f:
              languages[lang_file.stem] = json.load(f)
        for lang, overrides in self.languages.items():
            distPath =  config.DIST_DIR + '/'+ lang 
            Path(distPath).mkdir(exist_ok=True)
        return languages

    #
    # Copy the react files in the root folder
    #
    # Read all of the files in the root folder and copy them
    # Like all react config  files
    #
    def __copy_react_root_files(self):
        
        for rootFile in Path(config.SRC_TEMPLATE_PATH).glob("*.*"):
            source =  str(rootFile)
            #target = config.DIST_DIR  + source.replace(config.SRC_TEMPLATE_PATH ,'')
            #shutil.copy(source, target)
            for lang, overrides in self.languages.items():
                target = config.DIST_DIR + '/' + lang + '/' + source.replace(config.SRC_TEMPLATE_PATH ,'')
                shutil.copy(source, target)

    #
    # Generate the language templates for the given language
    #  
    def __generateLanguageTemplates(self, srcFile):
        translateObj = Translate()
        try:                                        
            with open( Path(srcFile), "r") as f:
                template = f.read()
                templateName = f.name
            for lang, overrides in self.languages.items():
                html = translateObj.translate(template, templateName, overrides)
               
                # update language codes
                html = html.replace('[[LANGUAGE_CODE]]', lang)
                html = html.replace('[[LANGUAGE_CODES]]', translateObj.language_codes(self.languages))
                # update language select options
                languageHtmlOptions = self.languageCodes.get_language_options_html(lang,self.languages)
                html = html.replace('[[LANGUAGE_HTML_OPTIONS]]', languageHtmlOptions)
                # update countries list
                html = html.replace('[[COUNTRIES_LIST]]', self.languageCodes.get_country_list())
                html = html.replace('[[PAGE_ABOUT_PARAGRAPHS]]',  translateObj.page_about_paragraphs())
                # write file
                targetFile  = self.__get_distFile(srcFile, lang)
                with open(targetFile, "w") as f:
                    f.write(html)
                print(f"Generated {targetFile}")
        except UnicodeDecodeError:
            for lang, overrides in self.languages.items():
                targetFile  = self.__get_distFile(srcFile, lang)
                shutil.copy(srcFile, targetFile)
                print(f"Copied {targetFile}")
            pass # Found non-text data

    #
    # Get the target path for the given source file
    #
    def __get_distFile(self, srcFile, lang):
        distFile = self.__targetFileName(srcFile, lang)
        targetFile = Path(config.DIST_DIR) / f"{distFile}"
        return targetFile

    #
    # Make file index.html from the default language index file
    #
    def __set_default_index(self):
        source = config.DIST_DIR + '/index_' + config.DEFAULT_LANGUAGE +'.html'
        target = config.DIST_DIR + '/index.html'
        shutil.copy(source, target)      


    #
    # Get file name for the given template and language
    #
    def __targetFileName(self, srcFile, lang) :
        srcFile = srcFile.replace(config.SRC_TEMPLATE_PATH + '/' ,'')
        langFolder =  config.DIST_DIR +'/' +  lang
        Path(langFolder).mkdir(exist_ok=True)
        return lang + '/' + srcFile
    #
    # Crawl all of the files and folder in the give folder and make translations
    #
    def __crawl(self, path):
        self.__makeDistFolder(path)
        for file in Path(path).glob("*"):
            if (file.is_dir()):
                # crawl a sub folder
                self.__crawl(str(file))
            else:
                self.__generateLanguageTemplates(str(file))
    #
    # make the given source folder in the dist folder
    # if it does not exist
    #
    def __makeDistFolder(self,srcPath):
        srcPath = srcPath.replace(config.SRC_TEMPLATE_PATH + '/' ,'')
        for lang, overrides in self.languages.items():
            distPath =  config.DIST_DIR + '/'+ lang + '/' + srcPath
            Path(distPath).mkdir(exist_ok=True)
