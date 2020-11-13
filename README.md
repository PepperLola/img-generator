# Image Generator

![Visits](https://badges.pufler.dev/visits/PepperLola/playerinfo?style=flat-square)
![Website](https://img.shields.io/website?style=flat-square&url=https%3A%2F%2Fwidgets.jerlshoba.com)
[![GitHub stars](https://img.shields.io/github/stars/PepperLola/img-generator?color=yellow&style=flat-square)](https://github.com/PepperLola/img-generator/stargazers)  
![GitHub top language](https://img.shields.io/github/languages/top/PepperLola/img-generator?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/PepperLola/img-generator?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/PepperLola/img-generator?style=flat-square)

### Generates widgets to include in websites and READMEs, etc.

## Base Url
The base url is the url of the server. If you're running it locally, you can likely use `http://localhost:3000`. If you want to access an already hosted version, use `https://widgets.jerlshoba.com`. This will be referred to as `[url]` in this document.

# Widgets

All widgets are available [here](https://widgets.jerlshoba.com).

## Progress Bar

### Endpoint:
`[url]/progress.png`  
`[url]/progress.jpg`

### Description:
Generates a progress bar.

### Parameters:
`width`: Width of the progress bar (e.g. `128` = 128px width)  
`height`: Height of the progress bar (e.g. `64` = 64px height)  
`fg`: Foreground color (e.g. `#ffffff` = white)  
`bg`: Background color (e.g. `#000000` = black)  
`border`: Border width (in pixels, e.g. `4` = 4px border)  
`text_color`: Color of the text (e.g. `#0000ff` = blue)  
`progress`: Progress of the bar (e.g. `0.5` = 50%)  
`font_size`: Size of the font (e.g. `14` = 14pt font)  
`font`: Overrides the font (e.g. `bold 14pt Roboto` = 14pt bold Roboto)  
`show_bg`: Whether or not to render the background  
`display_string`: Text to be displayed in the center (`[progress]` will be replaced with the percent, e.g. `10`)  

### Defaults:
`width`: Defaults to 256px  
`height`: Defaults to 32px  
`fg`: Defaults to white (`#ffffff`)  
`bg`: Defaults to black (`#000000`)  
`border`: Defaults to 1px  
`text_color`: Defaults to black (`#000000`)  
`progress`: Defaults to 50% (`0.5`)  
`font_size`: Defaults to 14pt  
`font`: Defaults to bold 14pt sans-serif  
`show_bg`: Defaults to true  
`display_string`: Defaults to `[progress]%`  

### Example Request:
`[url]/progress.png?width=512&height=64&fg=%23ffffff&bg=%232288ff&border=4&text_color=%232288ff&progress=0.75&font_size=18` would result in  
[![Progress Bar](https://widgets.jerlshoba.com/progress.png?width=512&height=64&fg=%23ffffff&bg=%232288ff&border=4&text_color=%232288ff&progress=0.75&font_size=18)](https://widgets.jerlshoba.com/progress.png?width=512&height=64&fg=%23ffffff&bg=%232288ff&border=4&text_color=%232288ff&progress=0.75&font_size=18)

## Semi-Radial Progress Bar

### Endpoint:
`[url]/semiRadialProgress.png`  
`[url]/semiRadialProgress.jpg`

### Description:
Generates a partial circular progress bar.

### Parameters:
`fg_rounded`: Whether to round the foreground  
`bg_rounded`: Whether to round the background  
`bg_width`: Width of the background line  
`fg_width`: Width of the foreground line  
Plus all Progress Bar parameters.

### Defaults:
`fg_rounded`: Defaults to true  
`bg_rounded`: Defaults to true  
`bg_width`: Defaults to 10px  
`fg_width`: Defaults to 5px  
Plus all Progress Bar defaults.

### Example Request:
`[url]/semiRadialProgress.png?width=256&height=256&fg=%23ffffff&bg=%232288ff&border=0&text_color=%232288ff&progress=0.75&font_size=16&fg_rounded=true&bg_rounded=true` would result in  
[![Semi-Radial Progress Bar](https://widgets.jerlshoba.com/semiRadialProgress.png?width=256&height=256&fg=%23ffffff&bg=%232288ff&border=0&text_color=%232288ff&progress=0.75&font_size=16&fg_rounded=true&bg_rounded=true)](https://widgets.jerlshoba.com/semiRadialProgress.png?width=256&height=256&fg=%23ffffff&bg=%232288ff&border=0&text_color=%232288ff&progress=0.75&font_size=16&fg_rounded=true&bg_rounded=true)

## Radial Progress Bar

### Endpoint:
`[url]/radialProgress.png`  
`[url]/radialProgress.jpg`  

### Description:
Generates a circular progress bar.

### Parameters:
Same as Semi-Radial Progress Bar.

### Defaults:
Same as Semi-Radial Progress Bar.

### Example Request:
`[url]/radialProgress.png?width=256&height=256&fg=%232288ff&bg=%23000000&border=0&text_color=%232288ff&progress=0.75&font_size=16&fg_rounded=true&bg_rounded=true&show_bg=false` would result in  
[![Radial Progress Bar](https://widgets.jerlshoba.com/radialProgress.png?width=256&height=256&fg=%232288ff&bg=%23000000&border=0&text_color=%232288ff&progress=0.75&font_size=16&fg_rounded=true&bg_rounded=true&show_bg=false)](https://widgets.jerlshoba.com/semiRadialProgress.png?width=256&height=256&fg=%232288ff&bg=%23000000&border=0&text_color=%232288ff&progress=0.75&font_size=16&fg_rounded=true&bg_rounded=true&show_bg=false)

## Multi-Progress Bar

### Endpoint:
`[url]/multiProgress.png`  
`[url]/multiProgress.jpg`  

### Description:
Generates a segmented progress bar.

### Parameters:
Same as Progress Bar **EXCEPT**  
`items`: List of items to be rendered (pointless at the moment, but still necessary)  
`progress_list`: Progress values for each item in the list (this will be used **instead** of `progress`)  
`color_list`: **Optional**, the list of colors the segments will be  

### Defaults:
Same as Progress Bar **EXCEPT**  
`items`: Defaults to an empty list  
`progress_list`: Defaults to an empty list  
`color_list`: Chooses a random color for each segment that wasn't manually assigned a color.

### Example Request:
`[url]/multiProgress.png?items=hello,hi,hi,hi&progress_list=0.25,0.25,0.25,0.125&color_list=%23000000,%23ff0000,%2300ff00,%230000ff` would result in  
[![Multi-Progress Bar](https://widgets.jerlshoba.com/multiProgress.png?items=hello,hi,hi,hi&progress_list=0.25,0.25,0.25,0.125&color_list=%23000000,%23ff0000,%2300ff00,%230000ff)](https://widgets.jerlshoba.com/multiProgress.png?items=hello,hi,hi,hi&progress_list=0.25,0.25,0.25,0.125&color_list=%23000000,%23ff0000,%2300ff00,%230000ff)

## Multi-Semi-Radial Progress Bar

### Endpoint:
`[url]/multiSemiRadialProgress.png`  
`[url]/multiSemiRadialProgress.jpg`  

### Description:
Generates a segmented semi-radial progress bar.

### Parameters:
Same as Semi-Radial Progress Bar **EXCEPT**  
`items`: List of items to be rendered (pointless at the moment, but still necessary)  
`progress_list`: Progress values for each item in the list (this will be used **instead** of `progress`)  
`color_list`: **Optional**, the list of colors the segments will be  

### Defaults:
Same as Semi-Radial Progress Bar **EXCEPT**  
`items`: Defaults to an empty list  
`progress_list`: Defaults to an empty list  
`color_list`: Chooses a random color for each segment that wasn't manually assigned a color.

### Example Request:
`[url]/multiSemiRadialProgress.png?items=hello,hi,hi,hi&progress_list=0.25,0.25,0.25,0.125&color_list=%23000000,%23ff0000,%2300ff00,%230000ff` would result in  
[![Multi-Semi-Radial Progress Bar](https://widgets.jerlshoba.com/multiSemiRadialProgress.png?items=hello,hi,hi,hi&progress_list=0.25,0.25,0.25,0.125&color_list=%23000000,%23ff0000,%2300ff00,%230000ff)](https://widgets.jerlshoba.com/multiSemiRadialProgress.png?items=hello,hi,hi,hi&progress_list=0.25,0.25,0.25,0.125&color_list=%23000000,%23ff0000,%2300ff00,%230000ff)

## Multi-Radial Progress Bar

### Endpoint:
`[url]/multiRadialProgress.png`  
`[url]/multiRadialProgress.jpg`  

### Description:
Generates a segmented radial progress bar.

### Parameters:
Same as Radial Progress Bar **EXCEPT**  
`items`: List of items to be rendered (pointless at the moment, but still necessary)  
`progress_list`: Progress values for each item in the list (this will be used **instead** of `progress`)  
`color_list`: **Optional**, the list of colors the segments will be  

### Defaults:
Same as Radial Progress Bar **EXCEPT**  
`items`: Defaults to an empty list  
`progress_list`: Defaults to an empty list  
`color_list`: Chooses a random color for each segment that wasn't manually assigned a color.

### Example Request:
`[url]/multiRadialProgress.png?items=hello,hi,hi,hi&progress_list=0.25,0.25,0.25,0.125&color_list=%23000000,%23ff0000,%2300ff00,%230000ff` would result in  
[![Multi-Radial Progress Bar](https://widgets.jerlshoba.com/multiRadialProgress.png?items=hello,hi,hi,hi&progress_list=0.25,0.25,0.25,0.125&color_list=%23000000,%23ff0000,%2300ff00,%230000ff)](https://widgets.jerlshoba.com/multiRadialProgress.png?items=hello,hi,hi,hi&progress_list=0.25,0.25,0.25,0.125&color_list=%23000000,%23ff0000,%2300ff00,%230000ff)


### Note:
All colors are in hex format.  
Hash symbol `#` must be URI encoded `%23`, or the browser will think you are referring to an anchor.  
**Do not** include the unit in any parameters (`pt`, `px`)
