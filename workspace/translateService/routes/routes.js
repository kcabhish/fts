const path = require('path');
const express = require('express');
require('dotenv').config();

const router = express.Router();

router.get('/isactive', (req, res, next) => {
    res.send('route is working');
});

router.get('/environments', (req, res, next) => {
    res.send(process.env);
});

router.post('/translate', (req, res, next) => {
    if (!req.body) {
        res.status(400).send('check request body');
    }
    const {text, sourceCode, targetCode} = req.body;
    const translatedText = text;
    const responseBody = {
        text, sourceCode, targetCode, translatedText
    }
    if (sourceCode === targetCode) {
        res.send(responseBody);
    } else {
        console.log(text);
        console.log(sourceCode);
        console.log(targetCode);
        // Translation should happen here
        // parse the req body and use the translate method here
        res.send(responseBody);
    }

});

module.exports = router;