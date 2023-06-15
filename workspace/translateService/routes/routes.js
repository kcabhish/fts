const path = require('path');
const express = require('express');
const { translate } = require('../utils/translate');
const { sendChatRequest } = require('../utils/chatgpt');
const { isActive } = require('../controllers/controllers');

require('dotenv').config();

const router = express.Router();

router.get('/isactive', isActive);

router.get('/environments', (req, res, next) => {
    res.send(process.env);
});

router.post('/translate',async (req, res, next) => {
    try {
        if (!req.body) {
            res.status(400).send('check request body');
        } else {
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
        
                // // enable this while testing
                // res.send({
                //     text: 'hello',
                //     sourceCode: 'en',
                //     targetCode: 'zh',
                //     translatedText: '你好'
                //   });
            }
        }

    } catch (e) {
        res.send('error');
    }
});

router.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
      // Send the chat request
      const chatReply = await sendChatRequest(message);
      // Send the chat reply as the response
      res.json({ reply: chatReply });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  

module.exports = router;