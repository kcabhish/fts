const path = require('path');
const express = require('express');
const { translate } = require('../utils/translate');
require('dotenv').config();

const router = express.Router();

router.get('/isactive', (req, res, next) => {
    res.send('route is working');
});

router.get('/environments', (req, res, next) => {
    res.send(process.env);
});

router.post('/translate',async (req, res, next) => {
    if (!req.body) {
        res.status(400).send('check request body');
    }
    const {text, sourceCode, targetCode} = req.body;
    let translatedText = text;
    const responseBody = {
        text, sourceCode, targetCode, translatedText
    }
    if (sourceCode === targetCode) {
        res.send(responseBody);
    } else {
        translatedText = await translate(text, sourceCode, targetCode);
        responseBody.translatedText = translatedText;
        res.send(responseBody);
    }
});

module.exports = router;