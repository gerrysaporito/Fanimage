# Fanimage Image Repository -- [fanimage.net](http://fanimage.net) (Currently down due to AWS costs)

## Introduction 🎩

This is an image repository web app that allows users to post images online for all to see, similar to imagur. The goal was to create an client & api that allows users to interact with the image repository.

NOTE: Because this web app is hosted online, I seperated the client (front-end) and api (back-end) servers in 2 seperate repositories for easier deployment. **You can see the api repository [here](https://github.com/gerrysaporito/FANIMAGE-api).**

## Description 📝

This is the client for the Fanimage api and is built leveraging Typescript & the PERN stack.

### INSPIRATION ✨

This app was originally created for the shopify image repository api backend challenge but revisited and further built on due to excess espresso and a slow day. I love shibas (mine is named Primo) and **anime** so I made a site where **fans** can post their favourite images about either (hence the name "Fanimage")!

### Learning Experience 📚

I chose to use my preferred stack (PERN) when planning this project to save time. Although I was already proficient with the technologies, I took this as an opportunity to express my creativity. I enjoyed creating custom themes like the ones seen below:

### ROADMAP

To date, the current site has the ability to add, remove, and view images (if user is authenticated). Tags have also been added to each image to allow searching in future versions. Buying and selling images is not in the roadmap as of now due to the possible legal complications.

#### NOTES

This site consists of 2 servers (react & node api found in my repos).

## Description 📝

This is a web app that allowed me to explore microservices in production environments.
The client interface is pretty bare bones as the project focused on the microservices aspect of the project.
Behind the scenes, there are 6 independent services managing the different features supported by the platform:

- Authentication
- Ticket Expiration
- Orders
- Payments
- Tickets
- Client

Each service is designed to act independently (from development to deployment). The Continuous Integration (CI) is done through github actions validating the build and tests are successful for services which have been worked on. Post validation, the updated services are deployed to a hosting provider via kubernetes such as DigitalOcean or AWS.

Common logic, middleware, types, etc. are stored on a publicly hosted NPM repository which standardizes definitions and related content between services. This ensures that all information is uniform across each server.

### Learning Experience 📚

This project gave me a chance to work with new technolgies including:

- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [NATS-Streaming](https://docs.nats.io/nats-streaming-concepts/intro)
- [Github Actions](https://docs.github.com/en/actions/learn-github-actions)
- [Custom NPM Packages](https://docs.npmjs.com/creating-node-js-modules)

This project also taught me more about:

- [Database-per-service architectures](https://microservices.io/patterns/data/database-per-service.html)
- [Event-driven archtectures](https://aws.amazon.com/event-driven-architecture/)
- [Service workers](https://developers.google.com/web/fundamentals/primers/service-workers)
- Concurrency & data management issues

## Getting Started 🏁

### Requirements ✅

- Docker (Desktop)
- Kubernetes
- [Skaffold](https://skaffold.dev/docs/quickstart/)

### Installation (Mac) 💾

1. Download [Docker desktop](https://hub.docker.com/editions/community/docker-ce-desktop-mac), run the .dmg and move the docker icon to applications
2. Open docker and log in
3. Click on the docker icon:

- select preferences
- click on the kubernetes tab and select the 'enable kubernetes' checkbox
- hit the 'apply and restart' button to install' kubernetes

4. Install [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/) for Docker desktop

- run the `kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission` in the command line

5. Update your hosts file:

- type in your command line: sudo vi /etc/hosts
- hit the 'i' key on your keyboard to enter editing mode
- at the bottom of the file, add a few extra empty lines and add the following: `127.0.0.1 ticketing.dev`
- hit the 'esc' key and enter ':wq' to write and quit (don't forget the colon)

6. Run the `skaffold dev` in the command line in the same directory as the skaffold.yaml file

### Notes 🖍

- If you try to open the url in chrome and you get a 'this connection is not safe', click anywhere on the page and type the phrase 'thisisunsafe' to bypass security

## Features 🧩

This app has the following functionalities:

- Sign in/up
- Add a ticket to the marketplace (seller)
- Add ticket to cart (buyer) and mark it 'reserved' for 15 min
- Create order from cart
- Checkout & pay for order

## Roadmap 🗺

This app is basic from a front end perspective (bootstrap) so in the future, the biggest thing I could see implemented is a user-friendly user interface. Aside from the visual aspects, ticket sharing/gifting and more advanced search functionalities can improve the user experience and cross-user interaction.

## Edge Cases ⚠️

Although this app is pretty robust (validated through tests and strict entity versioning requirements), there are still a few corners which I cut to make it work.

### Unsent Messages 🚩

For one, there is a case where a failed message may not be sent. If an entity is versioned but crashes immediately after, the message will not be sent to the messaging service to broadcast to the other listeners in the other services. This creates a data integrity issue, causing the databases to have inconsistent data. All broadcasted messages related to that entity moving forward will fail because of the differences in the entity's version.

To help with this, messages could be saved to the database together with the entity through a database transaction and background service worker can constantly query the message table and send out unsent messages. This ensures that all unsent messages will send regardless of server state.

### Incompatible Database Entity Version Schemas 🚩

Another shortcoming is the versioning requirement. Because all services run on MongoDB, a npm module was used to handle automatic versioning. This is fine until a service decides to use a different database (ex. PostgreSQL) and change the versioning schema. Because it is not the MongoDB version attribute, the version will never update and it will forever fail. There is no way to update the versioning schema from numbers to, for example, UUIDs.

To fix this, a custom versioning hook for MongoDB schemas can be implemented to handle versioning to ensure that the versioning schema is completely accessible.
