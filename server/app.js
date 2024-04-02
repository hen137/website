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

app.get('/video', (req, res) => {
    const videoFile = 'Mindful_Consumer_Podcast_Ep3video.mp4';
    let videoPath = '';
    if (process.env.NODE_ENV == "production") {
        videoPath = './build/' + videoFile;
    } else {
        videoPath = '../public/' + videoFile;
    }
    console.log("A " + process.env.NODE_ENV);
    const videoSize = fs.statSync(videoPath).size;

    console.log("B " + videoSize);
    const MAX_CHUNK = 10 ** 6; // 1 MB
    const range = req.headers.range;
    if (range) {
        console.log("C");
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = Math.min(start + MAX_CHUNK, videoSize - 1);
        const chunksize = end - start + 1;

        const head = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        fs.createReadStream(videoPath, { start, end }).pipe(res);
    } else {
        console.log("D");
        const head = {
            'Content-Length': videoSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
});

app.listen(PORT, () => console.log("Server started"));



