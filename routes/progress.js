const express = require('express');
const { createCanvas } = require('canvas');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let width = 256;
  let height = 32;
  let fg = '#fff';
  let bg = '#000';
  let border = 1;
  let textColor = '#000';
  let progress = 0.5;
  let fontSize = '14pt';
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
  let font = `bold ${fontSize} Menlo`;
  if (req.query.font) {
    font = req.query.font;
  }

  let canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  context.fillStyle = bg;
  context.fillRect(0, 0, width, height);

  context.fillStyle = fg;
  context.fillRect(border, border, (width - (border * 2)) * progress, (height - (border * 2)) * progress);

  let text = progress * 100 + "%";
  let textWidth = context.measureText(text).width;

  context.fillStyle = textColor;
  context.font = font;
  context.fillText(text, (width - textWidth)/ 2, height / 2);

  res.contentType('png');
  res.send(canvas.toBuffer('image/png'));
});

module.exports = router;
