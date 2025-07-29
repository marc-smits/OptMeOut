import json
import re
from pprint import pprint
class Translate:
  
  def __init__(self):
    self.translations = ''
  #
  # Translate the current template
  #
  def translate(self,template, templateFileName, overrides):
    html = template
    templateName = self.__getTemplateName(templateFileName)
    self.translations = json.dumps(overrides);
    json_object = json.loads(self.translations)
    html = self.__translateSet(html, '', json_object)
    return html
  
  #
  # Translate 
  #
  #
  # Translates from a json string, which might have child objects
  # like 
  # {
  #   'step1':
  #     { 
  #       'title': 'titel',
  #       'properties':{
  #         'name' : 'Naam', 
  #         'address': 'Adres
  #     }
  # }
  # 
  #  This fills the replacements: 
  #  {{step1.title}}
  #  {{step1.properties.name}}
  #  {{step1.properties.address}}
  #  
  def __translateSet(self, html, baseKey, json_object):
    for key in json_object.keys():
        placeHolder = "[[" + baseKey + key +"]]"
        translation = json_object[key]
        if ( isinstance(translation, str)):
            # We hav have value to replace
            html = html.replace(placeHolder, translation)
        else:
            # The translation is not yet value, but part of
            # json object, like properties.name
            if (baseKey != ""):
                subKey = baseKey  + key + "."
            else:
                  subKey = key + "."
            html = self.__translateSet(html, subKey, translation)
    html = self.__formatHtml(html)        
    return html

  #
  # Format html with special rules
  #
  def __formatHtml(self, html):
    # ‘opt-out’ must be red
    html = html.replace("‘opt-out’",'<span style={{color: "red"}}>' + "'" + 'opt-out' + "'" + '</span>' )

    # Text beteen <red> and  </red> to red
    # 
    # <red>Tell  me more</red>  => <span style={{color: "red"}}>Tell  me more</span>
    #
    html = html.replace("<red>",'<span style={{color: "red"}}>' )
    html = html.replace("</red>", '</span>' )
    return html

  #
  # return the template name, so that it can be recognized by translations
  #
  def __getTemplateName(self, templateFileName):
    template = templateFileName
    template = template.replace('.html', '');
    template = template.replace ("src/", '');
    return template



  #
  # Get sub  array of the translations
  #
  # Example: et_sub_array('page.about')
  #
  #  returns: {
  #          "title": "About",
  #          "paragraph1": {
  #              "h": "I am am h1",
  #              "p1": "h1 p1 text",
  #              "p2": "h1 p2 text "
  #          },
  #          "paragraph2": {
  #              "h": "I am a h2",
  #              "p1": "h2 p1  text",
  #              "p2": "h2 p2  text",
  #              "p3": "h2 p3  text"
  #          }
  #       }
  #  
  #  From the complete array :
  #
  #  "page": {
  #      "about": {
  #          "title": "About",
  #          "paragraph1": {
  #              "h": "I am am h1",
  #              "p1": "h1 p1 text",
  #              "p2": "h1 p2 text "
  #          },
  #          "paragraph2": {
  #              "h": "I am a h2",
  #              "p1": "h2 p1  text",
  #              "p2": "h2 p2  text",
  #              "p3": "h2 p3  text"
  #          }
  #        }
  #  }
  #
  def get_sub_array(self, arrayKey):
    keys = arrayKey.split('.')
    json_object = json.loads(self.translations)
    items = json_object[ keys[0] ]
    for key in keys:
      if (key in items):
        items = items[key]
    return items

  #
  # Get HTML for the place holder [[PAGE_ABOUT_PARAGRAPHS]]
  #
  def page_about_paragraphs(self):
    items = self.get_sub_array('page.about')
    html = ''
    for paragraphKey in items.keys():
      if (paragraphKey.startswith('paragraph')):
         paragraph = items[paragraphKey]
         for paragraphKey in paragraph.keys():
            tag = paragraphKey
            tag = re.sub(r'[0-9]+', '', tag)
            if tag == 'h' :
              tag = 'h1'
            row = '<' + tag + '>'
            row = row + paragraph[paragraphKey]
            row = row +'</' + tag + '>'
            html = html + row
    return html

  #
  # get language codes as string
  #
  def language_codes(self, languages):
      codes =''
      for lang, overrides in languages.items():
        codes = codes + '"' + lang + '",'
      return codes
