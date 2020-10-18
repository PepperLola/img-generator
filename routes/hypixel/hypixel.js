const express = require('express');
const {createCanvas} = require('canvas');
const router = express.Router();
const axios = require('axios');

const { Hypixel } = require('../../hypixel/HypixelApi');

Hypixel.setApiKey(process.env.HYPIXEL_API_KEY);

const createImage = (req) => {

}

/* GET users listing. */
router.get('/networkLevel.png', function (req, res, next) {
    if (!req.query.username) {
        res.status(400).send({success: false, message: "You must specify a username!"});
        return;
    }

    Hypixel.getUuidFromName(req.query.username).then(uuid => {
        Hypixel.getPlayerLevel(uuid).then(lvl => {
            Hypixel.getPlayerExp(uuid).then(xp => {
                let imageURL = "https://widgets.jerlshoba.com/progress.png";

                req.query.progress = Hypixel.getPercentageToNextLevel(xp);
                req.query.display_string = `Hypixel Level ${lvl}`;

                let reqKeys = Object.keys(req.query);

                let idx = 0;

                for (let i in reqKeys) {
                    let key = reqKeys[i];
                    if (key !== "username") {
                        imageURL += `${idx === 0 ? "?" : "&"}${key}=${req.query[key]}`;
                        idx ++;
                    }
                }

                imageURL = imageURL.split('#').join('%23');

                axios.get(imageURL, {
                    responseType: 'arraybuffer'
                })
                    .then(response => {
                        let buffer = Buffer.from(response.data, 'base64');

                        res.writeHead(200, {
                            'Content-Type': 'image/png',
                            'Content-Length': buffer.length,
                        })
                        res.end(buffer);
                    });
            })
        });
    });
});

router.get('/progress.jpg', function (req, res, next) {
    let canvas = createImage(req);

    res.contentType('jpg');
    res.send(canvas.toBuffer('image/jpeg'));
});

module.exports = router;
