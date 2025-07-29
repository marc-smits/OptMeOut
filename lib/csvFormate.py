########################################################################
#
# A class to handle language codes
#
########################################################################
from pprint import pprint
import json

class CsvFormate:
   
 
    #
    # Format Json for CSV
    #
    def format_text_from_json_to_csv(text):
        text = text.replace('&quot;' , '"')
        return text

    #
    # Format CSV for Json 
    #
    def format_text_from_csv_to_json(text):
        text = text.replace('"' , '&quot;')
        return text