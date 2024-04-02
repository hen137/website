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
    
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV == "production") {
        videoPath = './build/' + videoFile;
    } else {
        videoPath = '../public/' + videoFile;
    }

    console.log(videoPath + " " + fs.existsSync(videoPath));
    fs.createReadStream(videoPath).pipe(res);
})

app.listen(PORT, () => console.log("Server started"));



