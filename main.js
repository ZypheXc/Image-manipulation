const express = require('express')
const app = express()
const { Canvas, resolveImage } = require('canvas-constructor/skia');
const canvas = require('canvas')

app.get('/:feed', async (req, res) => {
    try {
        const query = req.query;
        const x = Number(query.x) || 0; // Parse `x` from the query
        const y = Number(query.y) || 0; // Correctly parse `y` from the query

        console.log(`Coordinates received: x=${x}, y=${y}`);

        const img = await resolveImage('./images/template.png'); // Load the template image

        let image = new Canvas(585, 559)
            .printImage(img, 0, 0, 585, 559) // Draw the template image
            .setTextFont('28px Impact') // Set font size and style
            .setColor('#FFFFFF') // Set text color
            .setTextAlign('center') // Center-align the text
            .printText(req.params.feed, x, y) // Use the parsed x, y coordinates
            .toBuffer(); // Render the image to a buffer

            res.set({
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            });
        res.send(image); // Send the rendered image
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing the image.');
    }
});


const PORT = Math.fround()
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));