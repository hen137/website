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
    const videoSize = fs.statSync(videoPath, {}).size;

    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;
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
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

app.listen(PORT, () => console.log("Server started"));



