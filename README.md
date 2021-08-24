# Fanimage Image Repository -- [fanimage.net](http://fanimage.net) (Currently down due to AWS costs)

## Introduction 🎩

This is an image repository web app that allows users to post images online for all to see, similar to imagur. The goal was to create an client & api that allows users to interact with the image repository.

## Description 📝

This repository contains the client and api for the Fanimage site, built with Typescript & PostgreSQL, Express, React, and Node(the PERN stack).

### INSPIRATION ✨

This app was originally created for the shopify image repository api backend challenge but revisited and further built on due to excess espresso and a slow day. I love shibas (mine is named Primo) and **anime** so I made a site where **fans** can post their favourite images about either (hence the name "Fanimage")!

### Learning Experience 📚

I chose to use my preferred stack (PERN) when planning this project to save time. Although I was already proficient with the technologies, I took this as an opportunity to express my creativity. I enjoyed creating custom themes like the ones seen below:

#### Dark

![alt text](./assets/theme-dark.png 'Dark Theme')

#### Gray

![alt text](./assets/theme-gray.png 'Gray Theme')

#### Retro

![alt text](./assets/theme-retro.png 'Retro Theme')

## Getting Started 🏁

### Requirements ✅

- Node & npm
- PostgreSQL or SQL alternative
- Working knowledge of AWS (to set up S3)

### Installation 💾

1. Download this repository
2. Rename `.env.example` -> `.env` and fill out the information
3. Open a command line window, navigate to the `fanimage-api` folder & run `npm run start`
4. Open another command line window, navigate to the `fanimage-client` folder & run `npm run start`
5. Go to [http://localhost:3000](http://localhost:3000)

### Notes 🖍

- If you try to open the url in chrome and you get a 'this connection is not safe', click anywhere on the page and type the phrase 'thisisunsafe' to bypass security

## Features 🧩

This app has the following functionalities:

- Sign in/up
- Add a picture to the repository
- View a single or all images from the repository
- Update & delete images you've uploaded
- Tag images based on certain keywords for easier searching
- Change color theme

## Roadmap 🗺

To date, the current site has the ability to add, remove, and view images (if user is authenticated). Tags have also been added to each image to allow searching in future versions. Buying and selling images is not in the roadmap as of now due to the possible legal complications.

## Edge Cases ⚠️

Although this app is pretty robust (validated through tests and strict entity versioning requirements), there are still a few corners which I cut to make it work.

### Unsent Messages 🚩

For one, there is a case where a failed message may not be sent. If an entity is versioned but crashes immediately after, the message will not be sent to the messaging service to broadcast to the other listeners in the other services. This creates a data integrity issue, causing the databases to have inconsistent data. All broadcasted messages related to that entity moving forward will fail because of the differences in the entity's version.

To help with this, messages could be saved to the database together with the entity through a database transaction and background service worker can constantly query the message table and send out unsent messages. This ensures that all unsent messages will send regardless of server state.

### Incompatible Database Entity Version Schemas 🚩

Another shortcoming is the versioning requirement. Because all services run on MongoDB, a npm module was used to handle automatic versioning. This is fine until a service decides to use a different database (ex. PostgreSQL) and change the versioning schema. Because it is not the MongoDB version attribute, the version will never update and it will forever fail. There is no way to update the versioning schema from numbers to, for example, UUIDs.

To fix this, a custom versioning hook for MongoDB schemas can be implemented to handle versioning to ensure that the versioning schema is completely accessible.
