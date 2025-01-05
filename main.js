const express = require('express')
const app = express()
const { Canvas, resolveImage } = require('canvas-constructor/skia');
const canvas = require('canvas')

app.get('/:feed/:x/:y', async (req, res) => {
    const { feed, x, y } = req.params;

    const img = await resolveImage('./images/template.png');
    const image = new Canvas(585, 559)
        .printImage(img, 0, 0, 585, 559)
        .setTextFont('28px Impact')
        .setColor('#FFFFFF')
        .setTextAlign('center')
        .printText(feed, Number(x), Number(y))
        .toBuffer();

    console.log(req)
        
    res.set({
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000',
    });
    res.send(image).status(200);
});


const PORT = Math.round(Math.random(1010, 8080))
app.listen(PORT, () => console.log(`Server running.`));