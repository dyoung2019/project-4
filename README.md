# photo-app-2019

http://photo-app-2019.surge.sh/

## Description

A frontend-only/in-browser non-destructive image composition editor (i.e. Photoshop / Illustrator clone) with vector drawing catered to exporting multiple assets such as favicons designed for desktop.

This was built from the final project of my General Assembly bootcamp class (SEI-Melb-22 Blackjack) during the final week.

## Functionality

  - Draw paths with pen
  - Adjust blending modes on a layer 
  - Add and delete layers in a composition
  - Adjust colors with React 
  - Change canvas size
  - Reorder layers

## Technologies

- [React.js](https://reactjs.org/)
  - Great for split an single web application in smaller components.
- [create-react-app](https://github.com/facebook/create-react-app)
  - really easy to get an simple React website up and running. 
- [p5.js](https://p5js.org/)
  - js drawing/image processing library for html canvas
- [paper.js](http://paperjs.org/)
  - js drawing library for drawing paths and shapes 
- [react-color](https://casesandberg.github.io/react-color/)
  - React.js color picker components

## Design process

### User stories 

I wrote my initial pitch to make a photoshop / illustrator clone with a minimum viable product:

> As a web developer, I want to be able a single image composition export (aspect-ratio) in multiple resolutions in the different resolution because I want to create favicons for many devices.

Yet, I had more other user stories for my project and put them into my [Trello board](https://trello.com/b/AdQU8k7Q/project-4)

### Wireframes

Next, I proceeded to make a number of [Wireframes in Figma](https://www.figma.com/file/YD6P76TkxuNwRU2EpGZxyb/Wireframes?node-id=6%3A38), looking at Figma, PhotoShop, Canva, Illustrator and After Effects for inspirations.

## Lessons learned 

Choosing an undertaking as 'writing your own photoshop clone' is  definitely an overwhelming task to complete in a week. I did find it challenging to incorporate two js canvas libraries.

However, I am still proud of my project.

# Wishlist features 
  - Pick colors for shapes
  - Draw paths with pen
  - Build vector shapes 
  - Save compositions
  - Draw mask shapes with pens
  - Import images into editor for layer
  - Import compositions for image
  - Place images around the composition
  - Reorder layers in composition, maybe drag and drop
  - Turn on/off layers
  - Adjust opacity on a layer
  - Adjust blending modes on a layer
  - Turn masks on for each layer
  - Export composition to jpg, png
  - Export to SVG
  - Export same aspect ratio to different resolutions
  - Export as favicons
  - Have a lightness histogram 
  - Able to reuse pre-comps 
  - Undo / redo history
  - Copy masks between layers
  - Writing out manifest.json for favicon 
  - Writing out BrowserConfig.xml for favicon
  - bodymoving integration 