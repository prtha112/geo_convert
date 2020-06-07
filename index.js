const compression = require('compression')
require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request');
const circleToPolygon = require('circle-to-polygon');
const naiveSearchMatch = require('./src/naive-string');
const { 
	centerGroup, 
	euclidean, 
	distanceMeter 
} = require('./src/math-geo')
const knnF = require('./src/geo-group')
const db = require('./src/modal/queries')
const app = express()
const port = process.env.MAIN_PORT 

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(compression())

const options = {
    provider: 'google',
    apiKey: process.env.API_GOOGLE_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/place_search_get', async (req, res) => {
    const options = {
         'method': 'POST',
         'url': process.env.API_THINKNET_URL, 
         'headers': {
              'Content-Type': 'application/json'
         },
         body: JSON.stringify({
		"keyword": req.body.keyword,
		"app_id": process.env.API_THINKNET_ID,
		"api_key": process.env.API_THINKNET_KEY
	 })
    };
    request(options, function (error, response) { 
  	if (error) throw new Error(error);
  	console.log(response.body);
	res.json(JSON.parse(response.body))
    });
})

app.post('/place_search_limit', async (req, res) => {
    console.log("Test")
})

app.get('/place_circle', async (req, res) => {
    const coordinates = [ req.body.lon, req.body.lat]; //[lon, lat]
    const radius = req.body.meters; // in meters
    const numberOfEdges = 32; //optional that defaults to 32

    let polygon = circleToPolygon(coordinates, radius, numberOfEdges);
    res.json(polygon["coordinates"])
})

app.post('/center_point', async (req, res)=> {
    let centroid = centerGroup(req.body)
    res.json(centroid)
})

app.post('/group_location', async (req, res)=>{
    const result = knnF(req.body, 3)
    res.json(result)
})

app.get('/orders', db.getOrders)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
