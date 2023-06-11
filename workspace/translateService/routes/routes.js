const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/isactive', (req, res, next) => {
    res.send('route is working');
});

module.exports = router;