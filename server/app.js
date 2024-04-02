require("dotenv").config();

const express = require('express');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("build"));

// Datamosh Middleware
// const dmosh = (req, res, next) => {
//     console.log("dmosh checkpoint");
//     const video_path = './Mindful_Consumer_Podcast_Ep3video.mp4';
//     fs.createReadStream(video_path).pipe(res);
//     next();
// };

// app.use("/video", dmosh);

// Routes
app.get("/", (req, res) => {
    res.send("test");
})

app.get('/video', async (req, res) => {
    const range = req.headers.range;

    if (!range) {
        res.status(400).send("Requires Range Header");
        return;
    }

    try {
        const videoFile = 'Mindful_Consumer_Podcast_Ep3video.mp4';
        let videoPath = '';
        if (process.env.NODE_ENV == "production") {
            videoPath = './build/' + videoFile;
        } else {
            videoPath = '../public/' + videoFile;
        }
        const videoSize = await fs.stat(videoPath).size;

        const start = Number(range.replace(/ytes=/, '').split('-')[0]);
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        const contentLength = end - start + 1;
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, headers)
        fs.createReadStream(videoPath).pipe(res);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }


})

app.listen(PORT, () => console.log("Server started"));



