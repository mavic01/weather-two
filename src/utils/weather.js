const request = require('request')
const geocode = require('./geocode')



const weather = (lat, lon, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=2ae9a36d25547c1c957ae696872d1710&query=" + encodeURI(lat) + ", " + encodeURI(lon) + "&units=f"
    request({ url, json: true }, (error, {body}) => { //response is an object, buh the only prroperty we're ever using is called 'body' (DESTRUCTURING)
        if (error){
            callback("Not able to access the net", undefined)
        }else if (body.error){
            callback("Incorrect location name. check spelling please", undefined)
        }else{
            
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out. It has a cloud cover of " + body.current.cloudcover + " and wind speed and direction of " + body.current.wind_speed + " and " + body.current.wind_dir + " respectively. The humidity is " + body.current.humidity)
        }
    })
}

module.exports = weather