const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    /*
    axios({
            method: 'POST',
            url: 'http://localhost:3031/hi',
            data: {
                foo: 'bar', // This is the body part
            }
        }).then(response => {
            res.render('index.ejs');
        })
        .catch(error => {
            console.log(error);
            res.send('error');
        });
    */
    res.render('index');
});

module.exports = router;