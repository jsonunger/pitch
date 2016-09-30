<p align="center">
    <img src="public/pitch.png" width="400" height="400">
</p>

<p align="center">
<b><a href="#overview">Overview</a></b>
|
<b><a href="#setup">Setup</a></b>
|
<b><a href="#technologies">Technologies</a></b>
</p>

[![Code Climate](https://codeclimate.com/github/jsonunger/pitch/badges/gpa.svg?style=plastic)](https://codeclimate.com/github/jsonunger/pitch)

## Overview
***Pitch*** is a fun music streaming, full stack JavaScript web app built with Node, Express, React, and Redux, among other tools.

As a user, you can browse albums and artists, look at all of an artist's songs regardless of the album, and create and browse publically available playlists.

## Setup
```bash
$ npm install
$ npm run db-init
```
The `db-init` npm script uses the `psql` CLI to create the database, so make sure you have the [PostgreSQL command line tools](https://www.postgresql.org/docs/9.2/static/app-psql.html) installed or you will encounter errors.

##### Seeding
You will need to seed the database with music in order to see anything in action in the app. In order to know which songs to choose, here are a few pieces of metadata the songs have to have:
name | genre | artist | location 
track number | album | album art* | sort names*
\* not required

The seed script works with XML files, and will default to using your `iTunes Music Library.xml` locally. However, if you have a file similarly structured, you can override the iTunes XML for your own.
Once you have gathered the music you want to use into an XML file, seed the database:
```bash
$ npm run seed -- [options] [path/to/xmlFile] # path can be absolute or relative
```
Available options you can use include `-f` to force sync the database, `-l <num>` to choose how many songs to allow to be seeded (the default is 150), `-u` to set an unlimited number of songs to be seeded. Lastly, after the options you can place the relative or absolute path to the XML file if you would like to override the use of `iTunes Music Library.xml`;

Once you have seeded the database, you are ready to visit the app.
```
$ npm start
```

Visit [localhost:1337](http://localhost:1337) to see the app in action.

## Technologies
#### Back End
This being a full stack JavaScript application, I used **Node** and **Express** for my server and api. The program also uses **PostgreSQL** for the database and works with the **Sequelize** ORM to manage models and relations.
#### Front End
Based on some of the constant and minimal changes that needed to be taking place in the UI, a broader framework such as Angular, Ember or Backbone have slower digests and I wanted my app to be as fast as possible. Because of that, I went with **React** for my view system. I worked with **React-Router** for my routing so that I could navigate within the single-page web app. For state management, I went with **Redux** and **React-Redux** for any shared knowledge between components.
#### Other Tools
In order to use ES6 syntax and even some ES7 syntax, I use **Babel** configured for ES2015, React, and Stage-0 implementations with additional plugins. For bundling purposes, I went with **Webpack**. In development, webpack middleware is built in to the Express process.

## Author's Note
This application was developed on a Mac, and as such will possibly work differently locally on Linux or PC systems.
