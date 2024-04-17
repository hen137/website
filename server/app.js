import express from 'express';
import got from 'got';

const PORT = process.env.PORT || 8080;
const app = express();

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
    res.sendFile("index.html");
});

app.get('/videoURL', (req, res) => {
    const downloadStream = got.stream("https://dmosh-media.s3.us-east-2.amazonaws.com/Mindful_Consumer_Podcast_Ep1video.mp4");

    console.log("NODE_ENV: " + process.env.NODE_ENV);
    if (process.env.NODE_ENV === "dev") {
        downloadStream.on("downloadProgress", ({ transferred, total, percent }) => {
            const percentage = Math.round(percent * 100);
            console.error(`progress: ${transferred}/${total} (${percentage}%)`);
        }).on("error", (error) => {
            console.error(`Download failed: ${error.message}`);
        });
    }
    downloadStream.pipe(res);
});

app.listen(PORT, () => console.log("Server started"));



