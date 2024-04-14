// require("dotenv").config();

import express from 'express';
import fs from 'fs';
import got from 'got';
import { S3Client, GetObjectAclCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

// const express = require('express');
// const fs = require('fs');
// const got = require('got');
// const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

const s3c = new S3Client({ region: 'us-east-2' });

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
})

app.get('/video', (req, res) => {
    const videoFile = '/media/The Most Misunderstood Concept in Physics.mp4';
    let videoPath = './build' + videoFile;
    console.log("A " + videoFile);
    const videoSize = fs.statSync(videoPath).size;

    console.log("B " + videoSize);
    const MAX_CHUNK = 10 ** 6; // 1 MB
    const range = req.headers.range;
    if (range) {
        console.log("C");
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
        console.log("D");
        const head = {
            'Content-Length': videoSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
});

app.get('/videoS3', async (req, res) => {
    const command = new GetObjectCommand({
        Bucket: 'dmosh-media',
        Key: 'Mindful_Consumer_Podcast_Ep1video.mp4',
        Credentials: {

        }
    });
    const item = await s3c.send(command);
    item.Body.pipe(res);

});

app.get('/videoURL', (req, res) => {
    const downloadStream = got.stream("https://dmosh-media.s3.us-east-2.amazonaws.com/Mindful_Consumer_Podcast_Ep1video.mp4");

    downloadStream.on("downloadProgress", ({ transferred, total, percent }) => {
        const percentage = Math.round(percent * 100);
        console.error(`progress: ${transferred}/${total} (${percentage}%)`);
    }).on("error", (error) => {
        console.error(`Download failed: ${error.message}`);
    });

    downloadStream.pipe(res);
});

app.listen(PORT, () => console.log("Server started"));



