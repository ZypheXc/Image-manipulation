const express = require('express')
const app = express()
const { Canvas, resolveImage } = require('canvas-constructor/skia');
const canvas = require('canvas')

app.use(express.static('public'));

app.get('/:feed', async (req, res) => {

    const img = await resolveImage('./images/template.png');

    let image = new Canvas(585, 559)
    .printImage(img, 0, 0, 585, 559)
    .setTextFont('28px Impact')
    .setColor('#FFFFFF')
    .printText(req.params.feed, 40, 150)
    .toBuffer();

    res.
    res.set({'Content-Type': 'image/png'}) //setting content type as png image!
    res.send(image)//sending the image!

})

app.listen(4456)//deploying the app in localhost with port 8080