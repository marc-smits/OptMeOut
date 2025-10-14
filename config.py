# templates source
SRC_TEMPLATE_PATH = "src/react"
# steps
STEPS_PATH = "src/steps.json"
# languages language json files
LANGUAGES_DIR = "src/languages"
PHP_API_LANGUAGES_DIR = "phpApi/api/languages"
# addresses address json file
ADDRESSES_API_DIR = "phpApi/api/addresses"

# generated html files
DIST_DIR = "dist"

# folder to import and export csv files
# this will have two sub directories
#
#  src/csv/languages/import     The Csv files found in this will be
#                               imported to the json files
#  src/csv/languages/export     All of the existing json files
#                               Are exported to this folder
#                               and can copied to the import
#                               folder with updates
CSV_DIR = "src/csv/languages"

# folder to import csv to json files
CSV_IMPORT_DIR = "src/csv/languages/import"
# generated translations javascript files
JS_DIR = "dist/js"

# folder to import addresses csv to json files
ADDRESSES_CSV_DIR = "src/csv/addresses/"

# character to separate csv columns
CSV_FIELD_SEPARATOR = ";"

# csv blogs with multiple paragraphs
# see more in lib/csvImport/multipleParagraphs.py
CSV_BLOGS_WITH_MULTIPLE_PARAGRAPHS="page.about,step1.optout,privacy_policy"


# default language
DEFAULT_LANGUAGE="en_GB"
