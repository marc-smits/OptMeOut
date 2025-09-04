########################################################################
#
# A class 
#
########################################################################
import json
from pprint import pprint
import config
class multipleParagraphs:

    headersIndex = 0
    paragraphsIndex = 0

    #
    # Is multi paragraph blog
    #
    @classmethod
    def isMultipleParagraph(cls,key):
        return (cls.__getBaseKey(key) != '') 


    #
    # Get multi paragraph blog base key 
    #
    def __getBaseKey(key):
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
    @classmethod
    def convertKey(cls, key):
        base = cls.__getBaseKey(key)

        if (key.endswith('.h')):   
            key =  base + '.' + str(cls.headersIndex) + '.h'
            cls.headersIndex = cls.headersIndex + 1 
            cls.paragraphsIndex = 0
        if (key.endswith('.p')):
            key = base + '.' + str(cls.headersIndex -1) + '.p.' + str(cls.paragraphsIndex)                  
            cls.paragraphsIndex = cls.paragraphsIndex + 1
        return key