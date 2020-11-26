# WIKI
WIKI #planthro WIKI | Platform anthropocene Inc. app website code. 
This is the template and content of the Platform anthropocene (#planthro) WIKI app project. 
View the implementation on wiki.planthro.org


Google script files and description

1. appscript.json
Dependencies, settings.

2. create.gs
Start point of the script, init() is the entry function. Checks if the user is authorized, if yes then executes.s

3. update.gs
Logic for searching and updating blogger post. 

4. service.gs
Request configuration and cleaning up of wiki pages fetched.

5. wikiapi.gs
Get pages from wikipedia and separate out sections, remove sections as required for out template.

6. generate_post_template.gs
Create html to create a blog post for the wiki page from the individual sections separated out from wiki page html.

7. post_config.gs
Blog post metadata, settings to create blog post(title, links).
