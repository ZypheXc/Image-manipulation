const express = require('express')
const serverless = require('serverless-http');
const app = express()



const { Canvas, resolveImage } = require('canvas-constructor/skia');
const canvas = require('canvas')

app.get('/:feed/:t', async (req, res) => {
    const { feed, t } = req.params;

    console.log(req.params)

    const textSize = Number(t) || 28

    const img = await resolveImage('./images/template.png');
    const image = new Canvas(585, 559)
        .printImage(img, 0, 0, 585, 559)
        .setTextFont(`${textSize}px Impact`)
        .setColor('#FFFFFF')
        .setTextAlign('center')
        .printText(feed, 295, 150)
        .toBuffer()
        
    res.set({
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000',
    });
    res.send(image).status(200);
});

module.exports.handler = serverless(app);

const PORT = Math.round(Math.random(1010, 8080))
app.listen(PORT, () => console.log(`Server running.`));