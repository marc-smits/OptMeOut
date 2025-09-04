########################################################################
#
# A class to handle blogs with multiple paragraphs
#
########################################################################
import json
from pprint import pprint
import config
import re
class MultipleParagraphs:

    #
    # Constructor
    # 
    def __init__(self):
        self.headersIndex = 0
        self.paragraphsIndex = 0

    #
    # Is multi paragraph blog
    #
    def isMultipleParagraph(self,key):
        return (self.__getBaseKey(key) != '') 


    #
    # Get multi paragraph blog base key 
    #
    def __getBaseKey(self,key):
        multiParagraphBlogKeys =  config.CSV_BLOGS_WITH_MULTIPLE_PARAGRAPHS.split(',')
        for multiParagraphKey in multiParagraphBlogKeys:
            if (key.startswith(multiParagraphKey)):
                return multiParagraphKey
        return ''

    #
    # Convert the key
    # 
    # Example:
    #
    # config.py
    # CSV_BLOGS_WITH_MULTIPLE_PARAGRAPHS="page.about,xxx.yy"
    #
    # csv:
    #   page.about.h;I am am h1
    #   page.about.p;h1 p1 text
    #   page.about.p;h1 p2 text
    #   page.about.h;I am a h2
    #   page.about.p;h2 p1  text
    #   page.about.p;h2 p2  text
    #   page.about.p;h2 p3  text
    #   page.about.h;I am a h3
    #   page.about.p;h2 p1  text
    #
    # Will be converted to 
    #  "about": {
    #        "title": "About",
    #        "0": {
    #            "h": "I am am h1",
    #            "p": {
    #                "0": "h1 p1 text",
    #                "1": "h1 p2 text"
    #            }
    #        },
    #        "1": {
    #            "h": "I am a h2",
    #            "p": {
    #                "0": "h2 p1  text",
    #                "1": "h2 p2  text",
    #                "2": "h2 p3  text"
    #            }
    #        },
    #        "2": {
    #            "h": "I am a h3",
    #            "p": {
    #                "0": "h2 p1  text"
    #            }
    #        }
    #
    def convertKey(self, key):
        base = self.__getBaseKey(key)
        
        # define the last part from the dot separated key
        # aaa.bbb.ccc => ccc
        parts = key.split('.')
        length = len(parts) 
        lastPart = parts[len(parts)-1]

        match lastPart :
            case 'h':
                key =  base + '.' + str(self.headersIndex) + '.h'
                self.headersIndex = self.headersIndex + 1 
                self.paragraphsIndex = 0
            case 'p':
                key = base + '.' + str(self.headersIndex -1) + '.p.' + str(self.paragraphsIndex)                  
                self.paragraphsIndex = self.paragraphsIndex + 1
            case 'readmore':
                key =  base + '.' + str(self.headersIndex -1) + '.' + lastPart     
            
        
        return key


    #
    # Convert json key to csv
    #
    def convertCsvKey(self, key):
        # replace .number by ''
        #pprint(key)
        key = re.sub('[.?!][0-9]', '', key)
        #pprint(key)
        return key
