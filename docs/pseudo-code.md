# Psuedo-code

## Idea #1

Implementation 
 - a single instance of p5.js context
 - multiple paper.js instance per layer
 - one visible canvas (p5.createCanvas) on screen 
 - one off-screen canvas (p5.createGraphics) for mask per layer
 - two p5 images (mask, source) per layer (not quite)

Vector mask
- One off-screen canvas (p5.createGraphics)
- One paper.js paper scope and layer 

Adjustment layer 
- One image of all layers below the current layer (p5.createGraphics) 
- One p5 off-screen canvas (p5.createGraphics) for vector mask

Image layer 
- One image loaded from jpg, png
- One layer for vector mask

## Idea #2
### HTML 
- Sources
  - p5 canvas are created here
  - img tags are created here too
- Masks
  - canvas as vector masks (p5 offscreen canvas)

## Idea #3
### HTML 
- Workspace
  - Composition(s)
    - Layer(s) attribute
      - Source
      - Mask

## Idea #4 
- p5 main container
  - separate sketch
  - background color
  - react
    - layer
      - source canvas div
      - mask canvas div

- React states
  - p5 instances
    - loop
    - setup
      - no loop
      - redraw on change  

- Composition
  - layers
    - switch toggle
    - Thumbnail(s)?
      - p5 sketch canvas (thumbnail resolution)
        - setup
          - canvas (original size)
          - no loop 
    - Source div
      - Canvas
    - Mask div
      - Canvas
    


## Layers
### New Layer 

1. Click on add button
1. To create a new layer, we need a 
    1. Source 
      1. If solid color required, then call p5.createGraphics 
      1. If 
    1. Mask
      Create a p5 graphics object for mask
    -  with class = paper canvas
  1. Append HTML id, attribute
  - with opacity = 100, position = (0, 0), rotation = 0, scale = 100%, 100%
1. Add to layer list above the highlighted layer 
1. Change highlight layer (focus)

### Delete Layer

1. Delete Button
1. Delete the highlighted layer (focus)
1. Remove layer from list

### Thumbnails
1. Get layer info for state
1. Requires p5 instance
1. Pass canvas id + mask id
1. Create a tiny div


### Undo History 


Based on Redux
````js

history {
  past: [1, 2, 3]
  current: 4
  future:[5, 6]
}

````