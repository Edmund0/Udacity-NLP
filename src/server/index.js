
/* BASIC SERVER INITIALIZATION */
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()
app.use(express.static('dist'))

const cors = require("cors");
app.use(cors());

// If you are using Express 4.16+ you don't have to import body-parser anymore: https://stackoverflow.com/questions/66525078/bodyparser-is-deprecated */
// const bodyparser = require("body-parser");
// app.use(bodyparser());

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads


    // designates the html entrypoint for the web app
    app.get('/', function (req, res) {
        res.sendFile('dist/index.html')
        //res.sendFile(path.resolve('src/client/views/index.html'))
    })

    // designates what port the app will listen to for incoming requests
    app.listen(8081, function () {
        console.log('Example app listening on port 8081!')
    })


/* BASIC ENVIRONMENT VARIABLE SETUP */
const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;



/* BASIC ROUTES FOR TEST */
console.log(__dirname)

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


/* BASIC ROUTES FOR MEANING CLOUD API */
const sentimentAnalysis = (API_KEY, formText = undefined, formURL = undefined) => {
    const formdata = new FormData();
    formdata.append("key", API_KEY);
    if   (formText === undefined)   {formdata.append("url", formURL)} 
    else                            {formdata.append("txt", formText)};
    formdata.append("lang", "en");  // 2-letter code, like en es fr ...

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then(response => response.json())
        .then(response => response)

    return response
}


/* BASIC ROUTES FOR API */
let formText = ""

    app.post('/sendText', async function (req, res) {
        
        formText = req.body.formText
        res.send(await sentimentAnalysis(API_KEY, formText));
    })

let formURL = ""

    app.post('/sendURL', async function (req, res) {
        
        formURL = req.body.formURL
        res.send(await sentimentAnalysis(API_KEY, undefined, formURL));
    })

   