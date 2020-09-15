# Image Generator

### Generates widgets to include in websites and READMEs, etc.

# Widgets

## Progress Bar

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

### Note
All colors are in hex format.  
Hash symbol `#` must be URI encoded `%23`, or the browser will think you are referring to an anchor.  
**Do not** include the unit in any parameters (`pt`, `px`)
