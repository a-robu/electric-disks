![Build and Deploy](https://github.com/a-robu/electric-disks/workflows/Build%20and%20Deploy/badge.svg?branch=master)

# Introduction

This is a simple mouse toy with coloured, bouncy balls. It is one of the programming projects I did when I was learning to program (in 2012), back when I was (supposed to be 🙂) studying for my university entrance exams.

Recently (2020) I decided to recover it from my Dropbox arhive, stick it on GitHub & give it some TLC (documentation, CI, [refactoring](https://github.com/a-robu/electric-disks/issues/2), etc.).

![usage-clip](usage-clip.gif)

# Playing with the Toy

Navigate to https://a-robu.github.io/electric-disks/ to play with the toy.

The interactions available to the player are the following:
- Move the mouse to nudge the balls.
- Click to shoot down a ball.

# Developing

Ensure that Node and NPM are installed and available.

```bash
$ node --version
v12.18.4
$ npm --version
6.14.6
```

Install Parcel with the following command.

```bash
npm install -g parcel-bundler
```

Now, serve the project in development mode with Parcel.

```bash
parcel index.html
```

A web browser should now have opened at http://localhost:1234/. It may take a few seconds to install necessary dependencies before the toy appears.
