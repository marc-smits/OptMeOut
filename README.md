# OptMeOut
OptMeOut

Use this command to run locally:
```
python build.py
```

Then visit the development website at http://localhost:8000/

To add a new language override, copy the template.json in `languages/` and change the values of the items in the JSON object. (TODO maybe switch to YAML for easier editing).


# Docs

Most of the documentation is kept in the Wiki on GitHub. This documentation also contains UML diagrams. The diagrams are created with [PlantUML](https://plantuml.com/). The files for this are stored in the repo so that they can be changed later. The quickest way to generate images from the plantuml files is to use their docker image:

```
docker run -d -p 8080:8080 plantuml/plantuml-server:jetty
```

Then visit http://localhost:8080/ to see use the server.
