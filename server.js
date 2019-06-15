//Declartion
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3008;


const gst_transform = require('./modules/gst_transform');

// Body Parser Middleware
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

//cors Middleware
app.use(cors());

app.use(express.static('./app'));

app.get('/', (req, res) => {
    res.render('index');
});


app.post('/normalize', (req, res) => {
    var rt = gst_transform(req.body);
    // res.sendStatus(200);
});


app.post('/fire', (req, res) => {
    // Define a users schema
    // let gst = req.body;
    // ["id","zero","sku","subid","subsku"]
    var data = {
        products: [{
            id: 'books0',
            zero: 0,
            sku: '00234-12312',
            subitems: [
                {   subid: "0.0", 
                    subsku: "subskuvalue0.0" 
                },
                { 
                    subid: "0.1", 
                    subsku: "subskuvalue0.1" 
                }
            ]
        }, {
            id: 'books1',
            zero: 1,
            sku: '10234-12312',
            subitems: [
                {   subid: "1.0", 
                    subsku: "subskuvalue1.0", 
                    type:[
                        {rt:1},
                        {xt:1}
                    ]
                },
                { subid: "1.1", subsku: "subskuvalue1.1" }
            ]
        }]
    };
    
    var rt = gst_transform(data);
    console.log(rt);

});

app.listen(port, () => console.log(`Port: ${port}`));