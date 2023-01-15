## Development Enviroment
* JavaScript
* Sass
* Node 14

## Project Structure
```
/node_modules       - Node modules, do not do anything here
/src                - Project source code
    /assets         - Images, fonts, videos, ...
    /js             - JavaScript 
    /scss           - Scss for styling
         /config    - Configuration files for styling
    app.build.css   - Built and minified scss, do not do anything here
    index.build.js  - Built and minified js, do not do anything here
    *.html          - Templates
```

## Configuration
* `_bootstrap.scss` Import settings for basic bootstrap
* `_fonts.scss` Fonts
* `_imports.scss` Import files such as components, pages and external packages
* `_variables.scss` Variables for bootstrap - grid, fonts, colors, etc.

## Commands
* `npm run build` Final project build
* `npm run serve` Webserver for easier development (watches changes in scss and js)
* `npm run predeploy` Deployment commands
* `npm run deploy` Deployment commands

## Documentations
* SCSS - https://sass-lang.com/
* Bootstrap - https://getbootstrap.com/docs/5.1/getting-started/introduction/