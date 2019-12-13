Photoshop / Illustrator clone

Tech Stack 
paper.js
p5.js  (Processing)
React
SVG
File upload 
Local storage???

Non-destructive image composition editor with vector drawing catered to exporting multiple assets such as favicons designed for desktop

Front-end

FAQs
https://realfavicongenerator.net/blog/favicon-why-youre-doing-it-wrong/

https://realfavicongenerator.net/faq#.XfLMur9xUlU

https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/dn320426(v=vs.85)?redirectedfrom=MSDN

MVP

Draw masks
Import images (as png/jpg) into composition
Place image into composition
Move and scale images
Draw shapes

Layers

Save composition file format xml, json
Load composition


User Stories

As a web developer, I want to be able a single image composition export (aspect ratio) in multiple resolutions in the different resolution because I want to create favicons for many devices.

As an end user, I want to be draw a mask over an source image so I can include only the part of the image in my final composition.

As an end user, I want to able to save my image composition so I can continue to work on the same file it later on.

As an designer, I want to able to switch off layers during export so I can export an image without some layers.

As an end user/designer, I want to reuse and group some layers into pre-compositions in my final compositions because I would like to another composition in new composition.

Exports 
  2D Width to Height Ratio (Aspect Ratio)
    Square (1W : 1H)
      - Export pixel dimensions
    Widescreen (16W : 9H)
      - Export pixel dimensions

Composition
  Pre-compositions

Pre-comps
  - Position 
  - Rotation
  - Scale
  - Opacity 
  - Templates

  Timeline ? FUTURE ? 
  Layers
    Source
      Video
      Bitmaps / Images (PNG )
      Precomps
      Vector Illustrations (SVG)
        - Sub Layers
          - Items 
          - Symbols
        - Solids 
        - Shapes 
        - Lines
      Canvas
    Mask
  Mattes 
    Masks
      SVG
  Filters / Adjustment Layers
  Groups / Precomps
  Sources
    Source only
  Background color
  
MVP
Layer 
  Mask 
  Source
  Blend Modes 
  Opacity

Pen 

HSL Lightness Histogram
https://editor.p5js.org/ebenjmuse/sketches/HyPfeGkCZ


Wishlist Features 
  - Pen stuff
    - Drop points on screen
    - Adjust handles in sync
    - Adjust handle independently
    - Delete paths
    - Edit paths
    - Edit handle on existing paths
    - Duplicate paths
    - Pick fill color for path shape
    - Pick stroke color for path shape
    - Move existing path around composition
    - Path boolean operations union/intersection/divide/subtraction
  - Pick colors for shapes
  - Draw paths with pen
  - Build vector shapes 
  - Save compositions
  - Draw mask shapes with pens
    - Square
    - Circle
    - Eclipse
    - Star
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
  - Writing out json - manifest.json
  - Writing out xml - BrowserConfig.xml

