<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/AlexBorgesDev/m-bot" />
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/AlexBorgesDev/m-bot" />
  <img alt="GitHub" src="https://img.shields.io/github/license/AlexBorgesDev/m-bot" />
</p>

# M-BOT

M-BOT is a simple music bot made for discord. Songs being pulled from youtube.

## Summary

- [Summary](#summary)
- [Getting Started](#getting-started)
  - [Install Dependencies](#install-dependencies)
  - [Environment Variables](#environment-variables)
  - [Build](#build)
  - [Running the application:](#running-the-application)
- [Commands](#commands)

## Getting Started

### Install Dependencies

First install the dependencies using, run in your bash:

```bash
npm install

# or with yarn

yarn install
```

### Environment Variables

We are almost ready to run the application, but before that you must create an **`.env`** file with the same keys as the *[`.env.example`](./.env.example)* file. Changing key values with your information.

### Build

After creating your **`.env`** file, it's time to build the application. Do this using the command:

```bash
npm run build

# or with yarn

yarn build
```

### Running the application:

Now that the application has been builder, run it using the command:

```bash
npm run start

# or with yarn

yarn start
```

## Commands

Before each command the prefix ! must be placed.

* **`!play`:** <br />

  * **Data:** <value\> - Name of the song

  * **Description:** Use this command to add a song to a new or existing playlist. <br />

* **`!skip`** <br />

  * **Description:** Skip the song being played to the next one in the list. <br />

* **`!playlist`** <br />

  * **Data:** <listId\> - The list id

  * **Description:** Use this command to add all songs from a youtube playlist to a new or existing playlist. <br />

* **`!volume`** <br />

  * **Data:** <value\> - Volume

  * **Description:** Set a new volume for a playlist. <br />

* **`!help`** <br />

  * **Description:** Displays all bot commands and their functions. <br />

# License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.
