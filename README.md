![Build and Deploy](https://github.com/a-robu/electric-disks/workflows/Build%20and%20Deploy/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/a-robu/electric-disks/badge.svg?branch=master)](https://coveralls.io/github/a-robu/electric-disks?branch=master)

# Introduction

This is a simple mouse toy with coloured, bouncy balls. It is one of the programming projects I did when I was learning to program (in 2012), back when I was (supposed to be 🙂) studying for my university entrance exams.

Recently (2020) I decided to recover it from my Dropbox arhive and stick it on GitHub.

![usage-clip](usage-clip.gif)

# Playing with the Toy

Navigate to https://a-robu.github.io/electric-disks/ to play with the toy.

The interactions available to the player are the following:
- Move the mouse to nudge the balls.
- Click to shoot down a ball.

Currently, this works poorly on mobile devices.

# Setting Up

Ensure that Node and NPM are installed and available.

```bash
$ node --version
v12.18.4
$ npm --version
6.14.6
```

Install the NPM dependencies.

```bash
npm install
```

# Developing

The following commands are useful when developing.

| Command | Description |
|---------|-------------|
| `npm run serve` | Runs the development server in watch mode, usually on http://localhost:1234/. |
| `npm run watch-test` | Runs unit tests in watch mode. |

If the `tmux` program is present on your machine, it is possible to setup a _tmux_ window with these commands running in separate panes by running the following commmand.

```bash
npm run watch-all
```

# Testing

To run the unit tests, run the following command.

```bash
npm test
```

To manually test the production build, run the followng.

```bash
npm run build-prod
npm run serve-prod
```

Alternatively, automatically test the production build, run the following commands.

```bash
npm run build-prod
npm run test-prod-smoke
```

Currently, this simply checks that there are no JS errors when running the production build in a browser. These tests are also included in the CI pipeline.

# Common Tooling Issues

The following error can be raised by Parcel (I encountered it when changing to a different installation of Parcel).

```
🚨  Cannot read property 'length' of undefined
    at lineCounter (/home/andrei/repos/electric-disks/node_modules/parcel-bundler/src/utils/lineCounter.js:3:30)
```

If this issue occurs, delete the `.cache/` directory (see discussion on [parcel#2957](https://github.com/parcel-bundler/parcel/issues/2957#issuecomment-486915492)). This should resolve the issue and allow Parcel to work well again.
