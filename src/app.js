const path = require('path')
const express = require('express')
const hbs = require("hbs")
const request = require('request')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const bodyParser = require("body-parser");


const app = express()
const port = process.env.PORT || 3000

// app.use(express.static(path.join(__dirname, '../public'))) //this will be run as the home page


app.set('view engine', 'hbs');
const viewPath = path.join(__dirname, '../templates/views')
app.set('views', viewPath);

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, '../public')))

app.use(bodyParser.urlencoded({extended: true}));



const weatherInfo = []

app.get('/', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Victor'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Victor'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Get help here!',
        title: 'Help',
        name: 'Get help here'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send(
            {error: 'you must provide an address'})
    }

    geocode(req.query.address, (error, { lat, lon, location } = {})=>{
        if (error){
            return res.send({error}) //..sends the error msg in geocode
        }
        weather(lat, lon, (err, weatherData) => {
            if (err){
                return res.send({err})
            }
            res.send({
                forecast: weatherData,
                location,
                address: req.query.address
            })
        })
    })
})


app.post('/', (req, res) => {
    const inputValue = req.body.me
    geocode(inputValue, (err, {lat, lon, location}) => {
        if (err){
            return res.send(err)
        }
        weather(lat, lon, (error, forecastData) => {
            if (error){
                res.send({error});
            }else{
             
               res.render('weatherinfo', {
                   forecast: forecastData,
                   location: location

               })
            }
        })
        // res.send(data)
    })

    // weatherInfo.push(inputValue)
})



app.get('/help/*', (req, res)=>{
    res.render('404', {
        Error: 'Help article not found',
        title: '404',
        name: 'Victor'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        Error: 'Page not found',
        title: '404',
        name: 'Victor'
    })
})

app.listen(port, () => {
    console.log('listening on port ' + port);
})
