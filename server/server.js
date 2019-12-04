const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const phoneBl = require('./phoneBL')
const app = express();

const PORT = 3201;
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

app.get('/login/:phone', (req, res) => {
    phoneBl.getPhoneOtp(req.params.phone, function (e, data) {
        if (e) {
            if (e === 'no id found') {
                return res.status(401).send();
            }
            else {
                return res.status(500).send();
            }
        } else {
            // console.log(data);
            return res.status(202).send();
        }
    })
});

app.get('/user/:otpPhone', (req, res) => {
    phoneBl.getPhoneDetails(req.params.otpPhone, function (e, data) {
        if (e) {

            return res.status(500).send();

        } else {
            console.log(data);
            return res.send(data);
        }
    })
})

app.listen(process.env.PORT || PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT || PORT}!`),
);

/*
app.post('/phone', (req, res) => {
    phoneBl.createPhone(req.params.id, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});
*/