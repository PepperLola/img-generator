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
  let fontSize = 14;
  let fgRounded = true;
  let bgRounded = true;
  let showBG = true;
  let bgWidth = 10;
  let fgWidth = 5;
  let displayString = "[progress]%";
  let itemsList = [];
  let progressList = [];
  let colorList = [];
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
  if (req.query.show_bg) {
    showBG = req.query.show_bg === "true";
  }
  if (req.query.bg_width) {
    bgWidth = parseInt(req.query.bg_width);
  }
  if (req.query.fg_width) {
    fgWidth = parseInt(req.query.fg_width);
  }
  if (req.query.display_string) {
    displayString = req.query.display_string;
  }
  if (req.query.items) {
    itemsList = req.query.items.split(',');
  }
  if (req.query.progress_list) {
    progressList = req.query.progress_list.split(',');
    for (let i in progressList) {
      progressList[i] = parseFloat(progressList[i]);
    }
  }
  if (req.query.color_list) {
    colorList = req.query.color_list.split(',');
  }

  /* Process display string */
  displayString = displayString.split("[progress]").join((progressList.reduce((a, b) => a + b, 0) * 100).toFixed(0).toString());

  let canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  if (showBG) {
    context.strokeStyle = bg;
    context.lineWidth = bgWidth;
    context.lineCap = bgRounded ? "round" : "square";
    context.beginPath();
    context.arc(width / 2, height / 2, width / 3, (3 / 4) * Math.PI, (1 / 4) * Math.PI);
    context.stroke();
  }

  let startAngle = 0.75 * Math.PI;

  for (let i in itemsList) {
    let progress = progressList[i];
    context.strokeStyle = colorList[i] ? colorList[i] : '#' + Math.floor(Math.random() * 16777215).toString(16);
    context.lineWidth = fgWidth;

    let endAngle = (1.5 * Math.PI) * progress + startAngle;
    while (endAngle > 2 * Math.PI) {
      endAngle -= 2 * Math.PI;
    }

    if (progress === 0) {
      border = 0;
    }

    context.lineCap = fgRounded ? "round" : "butt";
    context.beginPath();
    context.arc(width / 2, height / 2, width / 3, startAngle + (border / width), endAngle - (border / width) * (progress * 100 < border ? -1 : 1));
    context.stroke();

    startAngle = endAngle;
    console.log(startAngle / Math.PI, endAngle / Math.PI);
  }

  context.fillStyle = textColor;
  context.font = font;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.fillText(displayString, width / 2, height / 2);

  return canvas;
}

/* GET users listing. */
router.get('/multiSemiRadialProgress.png', function (req, res, next) {
  let canvas = createImage(req);

  res.contentType('png');
  res.send(canvas.toBuffer('image/png'));
});

router.get('/multiSemiRadialProgress.jpg', function (req, res, next) {
  let canvas = createImage(req);

  res.contentType('jpg');
  res.send(canvas.toBuffer('image/jpeg'));
});

module.exports = router;
