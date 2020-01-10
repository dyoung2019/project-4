# dpi-print-size

Build a calculator w.r.t A4 and Letter paper sizes and returns a pixel density [A4 paper specification](https://www.prepressure.com/library/paper-size/din-a4)

### Problem #1

Take a canvas and export out at the following 

#### Input

  1. Canvas size 
      - width 
      - height
  1. Export resolution
      1. Width
      1. Height

#### Output 
  1. Pixel density
    (REQUIRED)
  1. PPI
  1. Exported resolution
      1. Width
      1. Height

### Problem #2

Take a canvas and export out at the following

#### Input

  1. Canvas size 
      - width 
      - height
  1. Exported PPI
  1. Image Scale
      - scaled width
      - scaled height
  1. Document Reference (Print)
      - ppi
      - dimensions 
          - width (derived)
          - height (derived)

#### Output 
  1. Pixel density
  1. Exported resolution
      1. Width
      1. Height



## Table of sizes

| Size | Fixed Dimensions | PPI | Pixel Width | Pixel Height | Pixel Density |
| ---- | --------- | ----| --- | --- | --- |
| Widescreen HD | 1920 x 1080 | Ordinary | 1920 | 1080 | 1 |
|  | | Retina | 3840 | 2160 | 2 |
| A4  | 210 x 297 mm  | 300 ppi | 2480 | 3508 | | 
| | 8.27 x 11.69 inches | 150 ppi | 1240 | 1754 | |
| | | 96 ppi | 793.92 | 1122.24 | |
| | | 72 ppi | 595 | 841 | |
| Letter | 215.9 x 279.5 mm  | 300 ppi | 2550 | 3300 | | 
| | 8.50 x 11.00 inches | 150 ppi | 1275 | 1650 | |

### dpmm
Dots per mm 
> 1dpmm => 25.4 dpi OR 1 dpi => 0.03937 dpmm

### DPI
DPI means dots per inch

### PPI 
PPI stands for pixels per inch OR points per inch

### Widescreen HD
- 1K full sized image is 1920 x 1080

### A4
A4 measures 210 x 297mm or 8.27 x 11.69 inchs with an height/width ration of sqrt of 2

  - An full size A4 image at 300 ppi is 2480 x 3508 pixels
  - An full size A4 image at 150 ppi is 1240 x 1754 pixels

## Retina and High-DPI screens
Usually the pixel density is 2 for Macs

## PDF 
Uses PPI or points per inch
