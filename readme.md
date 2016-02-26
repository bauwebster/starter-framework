# Starter Website Template

This is a starter template for building websites. It has a Gulp-powered build system with these features:

- Handlebars HTML templates with Panini
- Sass compilation and prefixing
- JavaScript concatenation
- Built-in BrowserSync server
- For production builds:
  - CSS compression
  - JavaScript compression
  - Image compression

## Installation

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.10 or greater)
- [Git](https://git-scm.com/)

This application can be installed and set up manually.

### Manual Setup

To manually set up the template, first download it with Git:

```bash
https://github.com/bauwebster/routeOneAppNew.git
```

You will need Node.js, Gulp, Bower and Git installed on your computer.

Then open the folder in your command line, and install the needed dependencies:

```bash
cd projectname
npm install --save-dev gulp
npm install
bower install
```

Finally, run `npm start` to run Gulp. Your finished site will be created in a folder called `dist`, viewable at this URL:

```
http://localhost:8000
```

To create compressed, production-ready assets, run `npm run build`.
