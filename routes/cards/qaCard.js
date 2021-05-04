const express = require('express');
const {createCanvas} = require('canvas');
const router = express.Router();

const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    let words = text.split(' ');
    let line = '';
    let totalLines = 0;

    for(let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
            totalLines ++;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
    return totalLines;
}

const createImage = (req, res) => {
    let width = 512;
    let height = 128;
    let fg = '#fff';
    let bg = '#000';
    let border = 1;
    let textColor = '#000';
    let fontSize = 14;
    let showBG = true;
    let showFG = true;
    let displayString = "[progress]%";
    let q = "";
    let a = "";
    let leftPadding = 32;
    let topPadding = 32;
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
        border = parseInt(req.query.border);
    }
    if (req.query.text_color) {
        textColor = req.query.text_color;
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
    if (req.query.show_fg) {
        showFG = req.query.show_fg === "true";
    }
    if (req.query.q) {
        q = req.query.q;
    }
    if (req.query.a) {
        a = req.query.a;
    }

    let canvas = createCanvas(parseInt(width), parseInt(height));
    const context = canvas.getContext('2d');

    if (showBG) {
        context.fillStyle = bg;
        context.fillRect(0, 0, width, height);
    }

    if (showFG) {
        context.strokeStyle = fg;
        context.lineWidth = border;
        context.beginPath();
        context.rect(0, 0, width - 1, height - 1);
        context.stroke();
    }

    context.fillStyle = textColor;

    context.font = font;
    context.textBaseline = "middle";
    context.textAlign = "left";

    const linePadding = 8;

    let qMetrics = context.measureText(q);
    let qFontHeight = qMetrics.fontBoundingBoxAscent + qMetrics.fontBoundingBoxDescent;
    let qActualHeight = qMetrics.actualBoundingBoxAscent + qMetrics.actualBoundingBoxDescent;

    let aTotalLines = wrapText(context, q, leftPadding + border, topPadding + border, width - leftPadding - border, qActualHeight + linePadding);

    let aMetrics = context.measureText(a);
    let aFontHeight = aMetrics.fontBoundingBoxAscent + aMetrics.fontBoundingBoxDescent;
    let aActualHeight = aMetrics.actualBoundingBoxAscent + aMetrics.actualBoundingBoxDescent;

    wrapText(context, a, leftPadding + border, topPadding * 2 + border + qActualHeight * aTotalLines + linePadding, width - leftPadding - border, aActualHeight);

    return canvas;
}

/* GET users listing. */
router.get('/qaCard.png', function (req, res, next) {
    let canvas = createImage(req, res);

    res.contentType('png');
    res.send(canvas.toBuffer('image/png'));
});

router.get('/qaCard.jpg', function (req, res, next) {
    let canvas = createImage(req, res);

    res.contentType('jpg');
    res.send(canvas.toBuffer('image/jpeg'));
});

module.exports = router;
