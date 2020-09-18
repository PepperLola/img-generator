const express = require('express');
const {createCanvas} = require('canvas');
const router = express.Router();

const createImage = (req, res) => {
    let width = 256;
    let height = 32;
    let fg = '#fff';
    let bg = '#000';
    let border = 1;
    let textColor = '#000';
    let fontSize = 14;
    let showBG = true;
    let displayString = "[progress]%";
    let itemsList = [];
    let progressList = [];
    let colorList = [];
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
    if (req.query.display_string) {
        displayString = req.query.display_string;
    }
    if (req.query.items) {
        itemsList = req.query.items.split(',');
    }
    if (req.query.progress_list) {
        progressList = req.query.progress_list.split(',');
        for (let i in progressList) {
            progressList[i] = progressList[i];
        }
    }
    if (req.query.color_list) {
        colorList = req.query.color_list.split(',');
    }

    /* Process display string */
    // displayString = displayString.split("[progress]").join((progress * 100).toString());

    let canvas = createCanvas(parseInt(width), parseInt(height));
    const context = canvas.getContext('2d');

    if (showBG) {
        context.fillStyle = bg;
        context.fillRect(0, 0, width, height);
    }

    if (progressList.length < itemsList.length) {
        res.status(400).send(new Error('Too few items or colors in the list.'));
        return;
    }

    let leftOffset = 0;

    for (let i = 0; i < itemsList.length; i++) {
        let progress = progressList[i];
        context.fillStyle = colorList[i] ? colorList[i] : '#' + Math.floor(Math.random() * 16777215).toString(16);
        let itemWidth = (width - (border * 2)) * progress;
        context.fillRect(border + leftOffset, border, itemWidth, height - (border * 2));
        leftOffset += itemWidth;
    }

    context.fillStyle = textColor;
    context.font = font;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText(displayString, width / 2, height / 2);

    return canvas;
}

/* GET users listing. */
router.get('/multiProgress.png', function (req, res, next) {
    let canvas = createImage(req, res);

    res.contentType('png');
    res.send(canvas.toBuffer('image/png'));
});

router.get('/multiProgress.jpg', function (req, res, next) {
    let canvas = createImage(req, res);

    res.contentType('jpg');
    res.send(canvas.toBuffer('image/jpeg'));
});

module.exports = router;
