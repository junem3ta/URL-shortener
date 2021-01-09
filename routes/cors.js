const express = require('express'),
    cors = require('cors'),
    whiteList = [
        'http://localhost:3000',
        'http://127.0.0.1:5500',
        'https://app.glitch.me',
        'https://www.freecodecamp.org'
    ];

let corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    if(whiteList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {origin: true};
    } else {
        corsOptions = {origin: false};
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);