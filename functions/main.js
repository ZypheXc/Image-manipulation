const express = require('express');
const serverless = require('serverless-http');
const { Canvas, resolveImage } = require('canvas-constructor/skia');
const path = require('path');

const app = express();

app.get('/:feed/:t', async (req, res) => {
    const { feed, t } = req.params;
    console.log(req.params);

    const textSize = Number(t) || 28;

    try {
        // Resolve path to the template image
        const imgPath = path.join(__dirname, 'images', 'template.png');
        const img = await resolveImage(imgPath);

        const image = new Canvas(585, 559)
            .printImage(img, 0, 0, 585, 559)
            .setTextFont(`${textSize}px Impact`)
            .setColor('#FFFFFF')
            .setTextAlign('center')
            .printText(feed, 295, 150)
            .toBuffer();

        res.set({
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000',
        });
        res.status(200).send(image);
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).send('Error generating image');
    }
});

module.exports.handler = serverless(app);
