Car Cutter - Frontend Challenge
==========

Task
-----

### As a frontend developer you get the task to implement a Slider Web Component

A Slider is a media gallery that enables the user to swipe between different visuals. We need to display different kinds of visuals in the form of 360° Spins, static images, and videos. 

 - Default images show cars from various angles, either shot with the CarCutter App, or directly fed into our API Backend
 - 360° Spins are made up of a batch of images. Said batch is cycled through in a flipbook style and creates the illusion of an animated scenery
 - Videos are streamed directly through a player

The Slider will be a Web Component. Our customers can integrate said component in their website by embedding the necessary resources served via our CDN, or host the bundle themselves. Customers need the ability to alter the appearance of the slider in terms of general design and color choices so that it adapts to their CI and overall website design. Responsiveness is a given, as >60% of Internet traffic is mobile nowadays.

Please fork our repo and implement the challenge in `src/web-components/frontend-challenge_slider/`.

Requirements
-----

**Given a set of images that have the same aspect ratio (your choice of source)...**

 1. Implement a responsive Web Component that displays said images
    1. Users can slide (hence the name) through all images
    2. Users can toggle between standard and fullscreen modes
 2. Your component will be used by millions of end users, we appreciate a clean and easy to use UI/UX
 3. Your component can be configured by through custom attributes to turn on various features
    1. Preloading cache size (i.e. how many items are loaded from the source at once)
    2. A thumbnail view with previews of all images
    3. Whether the slideshow should wrap around or stop at the last item
    4. An option to make it auto-play
 4. Your component is stylable (Sizing options, colors, etc.)

The list above is ordered by priority. **We do not expect you to implement everything.** We only want to get a preview of your skills. Feel free to explain in writing how you would solve the various points you didn't implement.


Run It
-----

Serve a mockup with:
```bash
$ nvm exec 19 npm run serve
```

By default, the app is now reachable at `http://127.0.0.1:4200`


Setup
-----
Currently we are using node 19 so we recommend to use `nvm`.

Install `nvm` by following this [guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).

Install node 19:
```bash
$ nvm install node
$ nvm install 19
```

Don't forget to install the node packages:
```bash
$ nvm exec 19 npm install
```


Formatting
----------
Prettier is our formatter of choice. We added some settings for VSCode. If you use a different IDE please adapt the
settings.


Unit Tests
----------

Run with

```bash
$ nvm exec 19 npm test
```
