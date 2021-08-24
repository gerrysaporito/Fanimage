# Fanimage Image Repository -- [fanimage.net](http://fanimage.net) (Currently down due to AWS costs)

## Introduction 🎩

This is an image repository web app that allows users to post images online for all to see, similar to imagur. The goal was to create an client & api that allows users to interact with the image repository.

## Description 📝

This repository contains the client and api for the Fanimage site, built with Typescript & PostgreSQL, Express, React, and Node (PERN stack).

### INSPIRATION ✨

This app was originally created for the shopify image repository api backend challenge but revisited and further built on due to excess espresso in my system and a slow day. I love shibas (mine is named Primo) and **anime** so I made a site where **fans** can post their favourite images about either (hence the name "Fanimage")!

### Learning Experience 📚

I chose to use my preferred stack (PERN) when planning this project to save time. Although I was already proficient with the technologies, I took this as an opportunity to express my creativity. I enjoyed creating custom themes like the ones seen below:

#### Dark Theme

![alt text](./assets/theme-dark.png 'Dark Theme')

#### Grayscale Theme

![alt text](./assets/theme-gray.png 'Gray Theme')

#### Retro Theme

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

- If you try to open the url in chrome and you get a 'this connection is not safe', click anywhere on the page and type the phrase `thisisunsafe` to bypass security

## Features 🧩

This app has the following functionalities:

- Sign in/up
- Add a picture to the repository
- View a single or all images from the repository
- Update & delete images you've uploaded
- Tag images by unique keywords
- Change color theme

## Roadmap 🗺

As of right now, the core functionality which qualifies this as an MVP has been implemented and tested in real time.

Moving forward, integration tests will be implemented to ensure that all endpoints are functioning as expected. Also, advanced searches through common characteristics would also be incredibly useful to let users search by tags, key words, image sizes, types, and more to create a more seamless experience.

Another feature that was considered was the possibility of buying and selling images by leveraging Non-Fungible Tokens (NFT) and blockchain technologies. Doing so would require an incredible upfront time and financial investment along with more knowledge and a community to support the development, which was way beyond the scope of the original project.

Lastly although not a feature, legal paperwork (terms of use agreements & privacy policy) would be great to have to cover any liabilities on the individual user and and Fanimage & related entities. This is clearly beyond the scope of the project so it has not been pursued (nor do I think it ever will).

## Edge Cases ⚠️

This app was created without much thought for longetivity and robustness because the goal was to demonstrate raw knowledge on APIs and server architecture. That being said, there are a lot of edge cases to cover (aside from what would be covered by integration tests as mentioned in the roadmap).

### Variable Image Card Sizes 🚩

For one, the UI is still clunky. Image cards contain variable amounts of whitespace and change depending on the largest card in the row. The inconsistency in sizes is really 'hard on the eyes' (ugly) and makes the platform feel buggier than it really is.

To help with this, a masonry layout for the images (similar to [pinterest](https://pinterest.com)) would be a better fit for the nature of these posts.

### Lacking Middleware 🚩

Another shortcoming is the authentication middleware. Authentication is mostly handled in the client with the endpoints mostly being exposed. An example of this flaw can be seen when a user is only able to upload images if they are logged in but can still upload images by hitting the endpoint via [Postman](https://www.postman.com/) or something along those lines. The server will throw an error because the endpoint checks to see if a user exists before uploading but it should not get to this point to begin with.

To fix this, custom middleware should be added to the endpoints to ensure proper authentication. The only real validation right now is ensuring a user is authenticated. Validating a user owns posts before updating or deleting is a big security flaw that was acknowledged but not implemented due to the scope of this project.

### Notes

This is by no means an exhaustive list but only a few of the more critical points.
