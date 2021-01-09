const express = require("express"),
router = express.Router(),
cors = require('./cors'),
validUrl = require('valid-url'),
shortId = require('shortid'),
URL = require('../models/URL'),
dns = require('dns');

router.post('/new', cors.corsWithOptions, async (req, res, next) => {
    const longUrl = req.body.url,
    urlCode = shortId.generate(),
    baseUrl = process.env.BaseURL;

    if(!validUrl.isUri(baseUrl)) {
        return res.status(400).json('Invalid base URL');
    }

    !validUrl.isWebUri(longUrl) ? console.log(0, longUrl) : '';
    
    if(validUrl.isWebUri(longUrl)) {
        try {
            let url = await URL.findOne({longUrl: longUrl});
            if(url) {
                res.statusCode = 200;
                res.json({
                    "original_url": longUrl,
                    "short_url": url.shortUrl
                });  
            } else {
                const shortUrl = baseUrl + '/api/shorturl/' + urlCode;
                url = new URL ({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                
                res.statusCode = 200;
                res.json({
                    "original_url": longUrl,
                    "short_url": url.shortUrl
                });  
            }
        } catch(err) {
            console.error(err);
            res.status(500).json('Server Error');
        }
    } else {
        res.statusCode = 200;
        res.json({ 
            "error": "invalid url"
        });
    }
});

router.get('/:code', cors.corsWithOptions, async (req, res, next) => {
    try {
        const url = await URL.findOne({"urlCode": req.params.code});
        if(url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No URL found');
        }
    } catch(err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
});

router.get('/:shortUrl(*)', cors.corsWithOptions, async (req, res, next) => {
    if (validUrl.isUri(req.params.shortUrl)) {
        try {
            const url = await URL.findOne({"shortUrl": req.params.shortUrl});
            if(url) {
                return res.redirect(url.longUrl);
            } else {
                return res.status(404).json('No URL found');
            }
        } catch(err) {
            console.error(err);
            res.status(500).json('Server Error');
        }
    } else {
        res.statusCode = 400;
        res.json({ 
            "error": "invalid url"
        });
    }
});

module.exports = router;