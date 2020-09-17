const express = require('express');
const {createCanvas} = require('canvas');
const router = express.Router();

const createImage = (req) => {
  let width = 128;
  let height = 128;
  let fg = '#fff';
  let bg = '#000';
  let border = 1;
  let textColor = '#000';
  let progress = 0.5;
  let fontSize = 14;
  let fgRounded = true;
  let bgRounded = true;
  if (req.query.width) {
    width = parseInt(req.query.width);
  }
  if (req.query.height) {
    height = parseInt(req.query.height);
  }
  if (req.query.fg) {
    fg = req.query.fg;
  }
  if (req.query.bg) {
    bg = req.query.bg;
  }
  if (req.query.border) {
    border = parseInt(req.query.border);
  }
  if (req.query.text_color) {
    textColor = req.query.text_color;
  }
  if (req.query.progress) {
    progress = parseFloat(req.query.progress);
    if (Math.abs(progress) > 1) {
      progress /= 100;
    }
    if (progress < 0) {
      progress = 1 + progress;
    }
  }
  if (req.query.font_size) {
    fontSize = parseInt(req.query.font_size);
  }
  let font = `bold ${fontSize}pt Roboto`;
  if (req.query.font) {
    font = req.query.font;
  }
  if (req.query.fg_rounded) {
    fgRounded = req.query.fg_rounded === "true";
  }
  if (req.query.bg_rounded) {
    bgRounded = req.query.bg_rounded === "true";
  }

  let canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');


  context.strokeStyle = bg;
  context.lineWidth = 10;
  context.lineCap = bgRounded ? "round" : "square";
  context.beginPath();
  context.arc(width / 2, height / 2, width / 3, (3 / 4) * Math.PI, (1 / 4) * Math.PI);
  context.stroke();

  context.strokeStyle = fg;
  context.lineWidth = 5;

  let endAngle = (1.5 * Math.PI) * progress + (0.75 * Math.PI);
  while (endAngle > 2 * Math.PI) {
    endAngle -= 2 * Math.PI;
  }

  if (progress === 0) {
    border = 0;
  }

  context.lineCap = fgRounded ? "round" : "butt";
  context.beginPath();
  context.arc(width / 2, height / 2, width / 3, (3 / 4) * Math.PI + (border / width), endAngle - (border / width) * (progress * 100 < border ? -1 : 1));
  context.stroke();

  // context.fillStyle = fg;
  // context.fillRect(border, border, (width - (border * 2)) * progress, height - (border * 2));

  let text = progress * 100 + "%";

  context.fillStyle = textColor;
  context.font = font;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.fillText(text, width / 2, height / 2);

  return canvas;
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  let canvas = createImage(req);

  res.contentType('png');
  res.send(canvas.toBuffer('image/png'));
});

module.exports = router;
