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
    # Text beteen <red> and  </red> to red
    #
    # <red>Opt Out</red>  => <em>Tell  me more</em>
    #
    html = html.replace("<red>",'<em>' )
    html = html.replace("</red>", '</em>' )
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
  # Get HTML for the place holders [[PAGE_ABOUT_PARAGRAPHS]] and [[STEP_4_PRIVACY_POLICY]]
  #
  def multiple_paragraphs(self, selector):
    rows = self.get_sub_array(selector)
   
    html = ''
    for key in rows.keys():
      if (key.isnumeric()):
        if ('h' in rows[key] ):
          html = html +'<h1>' +  rows[key]['h'] + '</h1>'
        if ('p' in rows[key] ):
          for p in rows[key]['p'].keys():
             html = html +'<p>' + rows[key]['p'][p] + '</p>'
    return html


  #
  # Get json array for  [[[STEP_1_OPT_OUTS]]
  #
  def step1_opt_outs(self):
    result = []
    rows = self.get_sub_array('step1.optout.x')

    for index,row in rows.items():
      resultRow = {}
      paragraphs = []
      if ('h' in row ):
        resultRow['h'] = row["h"]
      if ('readmore' in row ):
        resultRow['readmore'] = row["readmore"]
      if ('p' in row ):
         for s,ppp in  row["p"].items():
            paragraphs.append(ppp)
      resultRow['p'] = paragraphs
      result.append(resultRow)
      

    return json.dumps(result, sort_keys=True)  


  #
  # get language codes as string
  #
  def language_codes(self, languages):
      codes =''
      for lang, overrides in languages.items():
        codes = codes + '"' + lang + '",'
      return codes

  #
  # get translations as json string which can be rendered as Javascript variable
  #
  def asJsonStr(self, overrides):
    overridesStr =  json.dumps(overrides)
    overridesStr = overridesStr.replace("'", "&quot")
    return overridesStr
