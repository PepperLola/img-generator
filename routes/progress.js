const express = require('express');
const {createCanvas} = require('canvas');
const router = express.Router();

const createImage = (req) => {
  let width = 256;
  let height = 32;
  let fg = '#fff';
  let bg = '#000';
  let border = 1;
  let textColor = '#000';
  let progress = 0.5;
  let fontSize = 14;
  let showBG = true;
  let displayString = "[progress]%";
  if (req.query.width) {
    width = req.query.width;
  }
  if (req.query.height) {
    height = req.query.height;
  }
  if (req.query.fg) {
    fg = req.query.fg;
  }
  if (req.query.bg) {
    bg = req.query.bg;
  }
  if (req.query.border) {
    border = req.query.border;
  }
  if (req.query.text_color) {
    textColor = req.query.text_color;
  }
  if (req.query.progress) {
    progress = req.query.progress;
    if (progress > 1) {
      progress /= 100;
    }
  }
  if (req.query.font_size) {
    fontSize = req.query.font_size;
  }
  let font = `bold ${fontSize}pt Roboto`;
  if (req.query.font) {
    font = req.query.font;
  }
  if (req.query.show_bg) {
    showBG = req.query.show_bg === "true";
  }
  if (req.query.display_string) {
    displayString = req.query.display_string;
  }

  /* Process display string */
  displayString = displayString.split("[progress]").join((progress * 100).toString());

  let canvas = createCanvas(parseInt(width), parseInt(height));
  const context = canvas.getContext('2d');

  if (showBG) {
    context.fillStyle = bg;
    context.fillRect(0, 0, width, height);
  }

  context.fillStyle = fg;
  context.fillRect(border, border, (width - (border * 2)) * progress, height - (border * 2));

  context.fillStyle = textColor;
  context.font = font;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.fillText(displayString, width / 2, height / 2);

  return canvas;
}

/* GET users listing. */
router.get('/progress.png', function (req, res, next) {
  let canvas = createImage(req);

  res.contentType('png');
  res.send(canvas.toBuffer('image/png'));
});

router.get('/progress.jpg', function (req, res, next) {
  let canvas = createImage(req);

  res.contentType('jpg');
  res.send(canvas.toBuffer('image/jpeg'));
});

module.exports = router;
