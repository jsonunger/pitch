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
***Pitch*** is a fun music streaming full stack JavaScript web app built with Node, Express, React, and Redux, among other tools.

As a user, you can browse albums and artists, look at all of an artist's songs regardless of the album, and create playlists just for you.

## Setup
```bash
$ npm install
```
The postinstall will use the `psql` CLI to create the database, so make sure you have the PostgreSQL command line tools installed or you will encounter errors.

##### Seeding
You will need to seed the database with music in order to see anything in action in the app. In order to know which songs to choose, here are a few pieces of metadata the app has to have:
title | genre | artist
album | album art*
\* not required

Once you have gathered the music you want to use into a directory, seed the database:
```bash
$ npm run seed /path/to/music # path can be absolute or relative
```
The seeding process takes time due to how it processes the files and metadata in order to seed the database, and there are clear logs throughout of what is currently happening.

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
