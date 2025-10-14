########################################################################
#
# A class to generate html from templates and fill the translations
#
########################################################################

import json
import os
import shutil
from pathlib import Path

import config
from lib.addresses import Addresses
from lib.languageCodes import LanguageCodes
from lib.translate import Translate


class HtmlGenerator:

    #
    # Constructor
    #
    def __init__(self):
        self.languages = self.__get_configured_languages()
        self.languageCodes = LanguageCodes(self.languages)
        self.addresses = Addresses()
        self. __generate_language_folders()

    #
    # Generate HTML files
    #
    def generate(self):
        self.__copy_react_root_files()
        self.__generateLanguageTemplates(config.SRC_TEMPLATE_PATH + '/index.html')
        self.__generateLanguageTemplates(config.SRC_TEMPLATE_PATH + '/rootIndex.html')
        path = config.SRC_TEMPLATE_PATH + '/src'
        self.__crawl(path)
        self.__set_default_index()
        return

    #
    # Get the the configured languages
    #
    def __get_configured_languages(self):
        languages = {}
        for lang_file in Path(config.LANGUAGES_DIR).glob("*.json"):
            with open(lang_file, "r", encoding="utf-8") as f:
                languages[lang_file.stem] = json.load(f)
        return languages

    #
    # Generate language folders
    #
    def __generate_language_folders(self):
        Path(config.DIST_DIR).mkdir(exist_ok=True)
        languages = {}
        for lang_file in Path(config.LANGUAGES_DIR).glob("*.json"):
            with open(lang_file, "r", encoding="utf-8") as f:
                languages[lang_file.stem] = json.load(f)
        for lang, _overrides in self.languages.items():
            distPath = config.DIST_DIR + '/' + lang + '/src/react/src'
            Path(distPath).mkdir(parents=True, exist_ok=True)
        return languages

    #
    # Copy the react files in the root folder
    #
    # Read all of the files in the root folder and copy them
    # Like all react config  files
    #
    def __copy_react_root_files(self):
        for rootFile in Path(config.SRC_TEMPLATE_PATH).glob("*.*"):
            source = str(rootFile)
            # target = config.DIST_DIR  + source.replace(config.SRC_TEMPLATE_PATH ,'')
            # shutil.copy(source, target)
            for lang, _overrides in self.languages.items():
                subpath = source.replace(config.SRC_TEMPLATE_PATH, '')
                target = config.DIST_DIR + '/' + lang + '/' + subpath
                shutil.copy(source, target)

    #
    # Generate the language templates for the given language
    #
    def __generateLanguageTemplates(self, srcFile):
        translateObj = Translate()
        try:
            with open(Path(srcFile), "r", encoding="utf-8") as f:
                template = f.read()
                templateName = f.name
            for lang, overrides in self.languages.items():
                html = translateObj.translate(template, templateName, overrides)

                replacements = {
                    # update language codes
                    '[[LANGUAGE_CODE]]': lang,
                    '[[LANGUAGE_CODES]]': translateObj.language_codes(self.languages),

                    # update language select options
                    '[[LANGUAGE_HTML_OPTIONS]]': self.languageCodes.get_language_options_html(lang, self.languages ),

                    # update countries list
                    '[[COUNTRIES_LIST]]': self.languageCodes.get_country_list(),
                    '[[PAGE_ABOUT_PARAGRAPHS]]': translateObj.multiple_paragraphs('page.about'),
                    '[[STEP_1_OPT_OUTS]]': translateObj.step1_opt_outs(),
                    '[[STEP_4_PRIVACY_POLICY]]': translateObj.multiple_paragraphs('privacy_policy.x'),

                    # update addresses list
                    '[[ADDRESSES_LIST]]': self.addresses.get_address_list(lang),

                    # all translations as json string
                    '[[TRANSLATIONS_JSON_STR]]': translateObj.asJsonStr(overrides),
                }
                for key, value in replacements.items():
                    html = html.replace(key, value)

                # write file
                targetFile = self.__get_distFile(srcFile, lang)
                with open(targetFile, "w", encoding="utf-8") as f:
                    f.write(html)
                # print(f"Generated {targetFile}")
        except UnicodeDecodeError:
            # Found non-text data
            for lang, overrides in self.languages.items():
                targetFile = self.__get_distFile(srcFile, lang)
                shutil.copy(srcFile, targetFile)
                # print(f"Copied {targetFile}")

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
        source = config.DIST_DIR + '/' + config.DEFAULT_LANGUAGE + '/rootIndex.html'
        target = config.DIST_DIR + '/index.html'
        shutil.copy(source, target)

    #
    # Get file name for the given template and language
    #
    def __targetFileName(self, srcFile, lang):
        srcFile = srcFile.replace(config.SRC_TEMPLATE_PATH + '/', '')
        langFolder = config.DIST_DIR + '/' + lang
        Path(langFolder).mkdir(exist_ok=True)
        return lang + '/' + srcFile

    #
    # Crawl all of the files and folder in the give folder and make translations
    #
    def __crawl(self, path):
        self.__makeDistFolder(path)
        for file in Path(path).glob("*"):
            if file.is_dir():
                # crawl a sub folder
                self.__crawl(str(file))
            else:
                self.__generateLanguageTemplates(str(file))

    #
    # make the given source folder in the dist folder
    # if it does not exist
    #
    def __makeDistFolder(self, srcPath):
        srcPath = srcPath.replace(config.SRC_TEMPLATE_PATH + '/', '')
        for lang, _overrides in self.languages.items():
            distPath = config.DIST_DIR + '/' + lang + '/' + srcPath
            Path(distPath).mkdir(exist_ok=True)
