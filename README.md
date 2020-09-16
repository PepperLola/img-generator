# Image Generator

### Generates widgets to include in websites and READMEs, etc.

## Base Url
The base url is the url of the server. If you're running it locally, you can likely use `http://localhost:3000`. If you want to access an already hosted version, use `https://widgets.jerlshoba.com`. This will be referred to as `[url]` in this document.

# Widgets

All widgets are available [here](https://widgets.jerlshoba.com).

## Progress Bar

### Endpoint:
`[url]/progress.png`

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

### Example Request:
`[url]/progress.png?width=512&height=64&fg=%23ffffff&bg=%232288ff&border=4&text_color=%232288ff&progress=0.75&font_size=18` would result in  
![Result](https://widgets.jerlshoba.com/progress.png?width=512&height=64&fg=%23ffffff&bg=%232288ff&border=4&text_color=%232288ff&progress=0.75&font_size=18)

### Note:
All colors are in hex format.  
Hash symbol `#` must be URI encoded `%23`, or the browser will think you are referring to an anchor.  
**Do not** include the unit in any parameters (`pt`, `px`)
