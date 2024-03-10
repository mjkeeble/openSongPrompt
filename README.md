# Songprompter

This is a local web app that works as a teleprompter for musicians in the browser. I say local in the sense that it is intended to be self-contained on the front end - the necessary data is stored locally in JSON files - the last thing you want is for your teleprompter to fail mid-concert because it can't reach the server!

Please note that it was developed for personal use based on my requirements, so will probably not have functionality that others need or expect. Also I run it locally in a dev environment, so you will need to know how to set this up to be able to use it.

## Running the app

The app was run developed to run on Node 18.18.2. It uses React 18.2. To run the app enter the following command in the terminal:
```
$ npm run dev
```

The app runs in the browser at [`localhost:5173`](url:'localhost:5173')
I recommend running it in full screen mode (you will need to activate this by hand in your browser) to maximise the space available for content.

I run the app on a Raspbery Pi with an external 4k screen. Navigation works using keypresses as detailed below. I use an Arduino as a keyboard emulator attached to footpedals to allow hands-free operation on stage.

## Customisation

As I said, this was written for personal use and the formating is optimised for the screen I used. You may need to change the settings to optimise it on your screen. Formatting is mainly done inline using [*tailwindcss*](url:'https://tailwindcss.com/docs/installation').

## Navigation

## Data storage
Data is stored in JSON files in the `data` folder. There is one file for gigs, and another for songs. See the types.ts file for schema details. The gigs JSON is of type `TGig[]`, songs is of type `TSong[]`.
