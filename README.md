# OptMeOut

## Contents

* [Introduction](#intro-section)
* [Install Python build](#python-section)
* [Manage translated templates](#translations-section)
  * [Importing new languages](#import-mew-section)
  * [Modifying translations](#modify-section)
  * [Adding translations to existing languages](#add-section)
  * [Country and location codes](#country-and-location-codes-section)
  * [Translation special tags](#special-tags-section)
  * [About and Privacy page paragraphs](#about-page-section)
  * [Read more paragraphs](#read-more-section)
* [Manage addresses](#addresses-section)
* [Folders](#folders-section)
* [React Js](#react-section)
  * [Files to modify](#react-section)
  * [Update React JS code](#react-update-section)
    * [Update code](#react-update-section)
      <a name='intro-section'></a>
* [phpApi](#php-section)
* [Deploy](#deploy-section)


## Introduction

Here are some instruction how to make translated templates and
modify the HTML and CSS templates.
Most of the instructions are step by step instructions, which can be done without a deep understanding.



<a name='python-section'></a>

# Install Python build

In this section you enable the command `python build.py` to make the translated templates.

1) Clone this repo.
2) It is recommended to launce command `python build.py` by executing in a docker container, by the command `./scripts/build.sh`  Alternativelt you can install  Python  in your computer ans run by the command `python build.py` .
   See the file `docker/README.md` for instructions to install the docker image and run the command
3) Make sure that you have read and write permissions in the following`./scripts/build.sh`
   folders

```
src/csv/languages/export/
src/csv/languages/import/
src/languages/
dist/
dist/js
```

In Mac and Linux  systems you do this by:

```
# On development server we can give file permissions for all files
sudo chmod -R 0777 *
```

Try by

```
./scripts/build.sh
```

You should see

```
-----------------------

 Mounting Python files from /Users/tuuliaantonius/gitrepos/opt_me_out/OptMeOut

-----------------------
opt_me_out_template_builder
Generated dist/en_GB/index.html
Generated dist/nl_NL/index.html
Generated dist/en_GB/src/style/theme.scss
Generated dist/nl_NL/src/style/theme.scss
Generated dist/en_GB/src/style/App.scss
Generated dist/nl_NL/src/style/App.scss
Generated dist/en_GB/src/components/LanguageSelect/LanguageSelect.jsx
...
```

translations-section'></a>

## Manage translated templates

In this section is presented how to manage the tranlations by excel sheets and some special rules.

<a name='import-mew-section'></a>

### Importing new languages

1) run the command

```
./scripts/build.sh
```

2) In the folder ```src/csv/languages/export/``` you have all of the translation files in csv
   format.

```
ls src/csv/languages/export/
en_GB.csv
fi_FI.csv
nl_NL.csv
```

Copy the file ```src/csv/languages/export/en_GB.csv```
to the folder ```src/csv/languages/import``` and rename it after the new language local
in this case nl_BE.csv
```src/csv/languages/export/nl_BE.csv```
The locale codes you can find in the file ```src/languages/en_GB.json```, ```splash.countries.list```

```
 "splash": {
        "countries": {
            "h1": "Select your country",
            "list": {
                "1": "Austria,de_AT",
                "2": "Belgium (NL),NL_BE",
                "3": "Belgium (FR),fr_BE",
                "4": "Bulgaria,bg_BG",
                "5": "Croatia,hr_HR",
                ...
```

If you need to add more languages please update alse  the in the file ```src/languages/en_GB.json```.
You can find the locale codes in:
```https://saimana.com/list-of-country-locale-code/```
All of locales should have two parts separated by '_'
As language_country
Examples:

```
nl_NL => Ducth, Netherlands,
nl_BE => Ducth, Belgium
```

Open the file and modify the third column, ```Translation (EN_GB)```
as  ```Translation (NL_BE)``` and translate the third column.

*Columns*
```Key```  This column includes the translation key and should not be
modified.
```English```  Here is the source word or sentence, to be translated for
the desired language.
```Translation (NL_BE)``` The column to be translated and filled by the desired language,

```
Key,English,Translation (NL_BE)
menu.about;about;about
menu.locale;EN;EN
menu.country;Ireland;Ireland
button.tellmemore;Tell me more;Tell me more
button.OptMeOut;OptMeOut;OptMeOut
button.readmore.less;less;less
button.readmore.more;more;more
page.fallback.header;This website provides EU `opt--out’ from the EHDS
page.fallback.intro;Ourpean Health Data Space (EHDS). Please in by clicking <red>"Select Country"</red>
page.about.title;About;About
page.about.h;I am am h1;I am am h1
page.about.p;h1 p1 text;h1 p1 text
page.about.p;h1 p2 text;h1 p2 text
page.about.h;I am a h2;I am a h2
page.about.p;h2 p1  text;h2 p1  text
page.about.p;h2 p2  text;h2 p2  text
page.about.p;h2 p3  text;h2 p3  text
page.about.h;I am a h3;I am a h3
```

3) Run the build command again

```
./scripts/build.sh
```

4) Now we have a template translated in Belgium Dutch
   ```dist/nl_BE.html```

<a name='modify-section'></a>

## Modifying translations

In this case we do the same as in the case "Importing new languages",
but instead of creating a new file we copy an existing file to the folder
```src/csv/languages/import```, modify it and run the build command again.

<a name='add-section'></a>

### Adding translations to existing languages

1) Build all

```
./scripts/build.sh
```

2) Copy the file
   ```src/csv/languages/export/en_GB.csv``` to ```src/csv/languages/import/en_GB.csv```
   Make sure that there are no other csv files
   Add a new translation (in the example below we have "newTranslation" on the first row)

```
Key,English,Translation (EN_GB)
newTranslation;new translation;new translation
menu.about;about;about
menu.locale;EN;EN
menu.country;Ireland;Ireland
button.tellmemore;Tell me more;Tell me more
```

3) Build again

```
./scripts/build.sh
```

4) Now in the folder ```src/csv/languages/export```
   We have the cvs files with a new translation as an empty field:
   Example nl_NL.csv

```
Key,English,Translation (NL_NL)
newTranslation;new translation;
menu.about;about;NL about
menu.locale;NL;NL
menu.country;Netherlands;Netherlands
button.tellmemore;NL Tell me more;Tell me more

```

Copy all of the files to the folder

```src/csv/languages/import/```
And fill the empty fields
Example nl_NL.csv

```
Key,English,Translation (NL_NL)
newTranslation;new translation; NL new translation
menu.about;about;NL about
menu.locale;NL;NL
menu.country;Netherlands;Netherlands
button.tellmemore;NL Tell me more;Tell me mores
```

5) After the modifications, build again and
   the translations are updated.

<a name='special-tags-section'></a>

### Translation special tags

Below some special tags to modify the format of the texts

#### Red

All of the texts which are surrounded by the tags ```<red></red>``` will be rendedered in red.

Example:
```<red> This will be red </red>```

Also all of the strings ```'opt-me'``` are rendered in red.

<a name='about-page-section'></a>

### About and Privacy page paragraphs

On the page 'about' (src/react/src/steps/About.jsx) we have a place holders  [[PAGE_ABOUT_PARAGRAPHS]] and [[STEP_4_PRIVACY_POLICY]] for the  paragraphs.
See  src/react/src/steps/About.jsx and src/react/src/steps/PrivacyPolicy.jsx

The number of the can vary.
The paragraphs are defined in the Excel as following:

```
page.about.h;I am am h1;I am am h1
page.about.p;h1 p1 text;h1 p1 text
page.about.p;h1 p2 text;h1 p2 text
page.about.h;I am a h2;I am a h2
page.about.p;h2 p1  text;h2 p1  text
page.about.p;h2 p2  text;h2 p2  text
page.about.p;h2 p3  text;h2 p3  text
page.about.h;I am a h3;I am a h3
```

This will render the following three paragraphs.

```
   <h>I am am h1</h>
   <p>h1 p1 text</p>
   <p>h1 p2 text </p>

   <h>I am a h2</h>
   <p>h2 p1  text</p>
   <p>h2 p2  text</p>
   <p>h2 p3  text</p>

   <h>I am a h3</h>
   <p>h2 p1  text</p>
```

The number of Paragraphs and the <p> sections may vary.
The generic structure for one paragraph is

<a name='read-more-section'></a>

### Read more paragraphs

In a similar as we do with the paragraphs on the pages  About.jsx and PrivacyPolicy.jsx
(See the prevoius paragraph) We can render a random number of paragraphs with a header.
Additionally we also have a 'read more' section, which we import in the csv as following:

```
step1.optout.h;I am optout 1;I am optout 1
step1.optout.readmore;I am am readmore1;I am am readmore1
step1.optout.p;optout 1 text1;optout 1 text1
step1.optout.p;optout 1 text2;optout 1 text2
step1.optout.readmore;I am am readmore2;I am am readmore2
step1.optout.h;I am optout 2;I am optout 2
step1.optout.p;optout 2 text1;optout 2 text1
step1.optout.p;optout 2 text2;optout 2 text2
step1.optout.p;optout 2 text4;optout 2 text4
```

<a name='addresses-section'></a>

## Manage addresses

Importing and exporting addresses work in the same was importing and exportiong
translations.
You execute them also by the command `./scripts/build.sh`

The csv folders for importing and exporting are found in the folders

```
src/csv/addresses/export/
src/csv/addresses/import/
```

The script creates the json feeds in the folder: `phpApi/api/addresses`

The format of the csv files can be seen below

```
organization;title;name;surname;street;number;postal code;city;country
Huisartsen Assen-West;dhr.;Daan;de Jong;Oostergracht;2;9408 MR;Assen;Nederland
Huisartspraktijk Kastelenbuurt;;;;Brittenburg;12;1023RB;Amsterdam;Nederland
Zuidas Huisartsen;dhr.;Liam;Jansen;Gustav Mahlerlaan;635b;1024AR;Amsterdam;Nederland
```

<a name='folders-section'></a>

## Folders

### src/languages/

This folder has the translations files in json format
When translating the templates these files are used
to define the translations.

Example: en_GB.json

```
    {
        "pageTitle": "Compose Your Letter",
        "previous": "Previous",
        "next": "Next",
        "step1": {
            "title": "Name and Address",
            "properties": {
                "name": {
                    "title": "Full Name"
                },
            "address": {
                "title": "Address"
                }
            }
        }
    }

```

### phpApi/api/addresses

This folder has the a similar format with the folder
`src/addresses` having the addresses per country in json format.

### src/csv/languages/export/

After each build, the existing json files in the folder
```src/languages/``` are exported into this folder in csv format.
These files can be used for the updates of the existing
languages or adding a new languages.

Example:
nl_NL.csv

```
Key,English,Translation (NL_NL)
pageTitle;Compose Your Letter;NiiiL Compose Your Letter
previous;Previous;NL Previous
next;Next;NL Next
step1.title;Name and Address;NAW gegevens
step1.properties.name.title;Full Name;Voll1111edige naam
step1.properties.address.title;Address;Adres
```

### src/csv/languages/import/

In this folder we have the cvs files to be imported by the ```scripts/build.sh``` command to the
json files in the folder ```src/languages/```
The file CSV file structure is the same.

### src/csv/addresses/export/ and ### src/csv/languages/import

These folder are used in a similar way with the addresses to import and export
addresses

### src/react

Source React Js files to be translated to the folder dist
See how to do this in the section 'React Js'

### dist

The generated html templates are in this folder.
Each language has its own sub folder and index file like

```
dist/en_GB
    index.html
 dist/nl_NL
    index.html
```

See more about the file structure in the section "Update React JS code"

### dist/js

Here we have the translations as a a Javascript function,
which can be used in the Javascript code by function _trns
Example:

```
let translationsJson='{"pageTitle": "Compose Your Letter", "previous": "Previous", "next": "Next", "step1.pertires.address.title": "Address"}';
let  globalTranslationsObj = JSON.parse(translationsJson);
function _trns(translation){return(globalTranslationsObj[translation]);}
```

<a name='react-section'></a>

## React Js

Below are some notes how to modify the HTML and CSS files with React JS.
The react js  source code can be found in the folder ```src/react```
You edit and modify this folder.
The best way to edit these files is to open you editor direcctly on this folder.

<a name='react-modify-section'></a>

### Files to modify

Most important files and folders to modify HTML and CSS.

#### Main file

src/react/src/App.jsx
src/react/src/style/App.scss

This file is the main file and controls the current open step or open section.

The HTML code starts in the section starting by

```
return (
 <>

   <header>
     <Header
       emitChangeSection={changeSection}
     />
   </header>


   <div id="mainContent">
```

Only this part should be modified for HTML and CSS changes.

#### Steps

All of the steps and sections can be found in in the folder
```src/react/src/steps```

Each step has its own .jsx file (code for HTML) ans the .scss file(code for CSS).
There is also a common style sheet ```src/react/src/steps/steps.scss```
Which is shared by all /jsx files in the folder.

Each .jsx file has the HTML code in the section starting by

```
return (
 <>
```

Only this part should be edited.

Example Step1 files.
HTML file
```src/react/src/steps/Step1.jsx```
start edition form the block

```
return (
        <div className="step" id="step1">

```

Css for step1
```src/react/src/steps/Step1.scss```

Common Css
```src/react/src/steps/steps.scss```

<a name='react-update-section'></a>

## Update React JS code

In this section you get to know how to update this site on your local server.

<a name='react-install-section'></a>

### Install

Before updating you need to enable this code on your local host.


<a name='react-update-section'></a>

### Update code

After each time you update you need to run the command:
```./scripts/build.sh```

The chages are automstically updated to the URL
http://localhost:5173/

Sometimes you need to refresh the page.

<a name='php-section'></a>

# phpApi

This api provides some functions for Ajax requests.

*

 See more info in `phpApi/README.md`


<a name='deploy-section'></a>
# Deploy
Zie: [docker/README.md](docker/README.md)