const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWF2aWMwMSIsImEiOiJja2w1OGtlZWEwajZoMm9wanlsMWt0Zmx6In0.NmlrVi3DLgev5d04dArm3Q"
    
    request({url, json: true}, (err, {body}) => {
        if (err){
            callback('Unable to connect to location services', undefined)//every callback has arr and data arg..here, its undefined
        }else if (body.features.length === 0){  //no result found
            callback('Unable to find location. Try another search', undefined);
          }else{
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name
            }); 
         }
    })
}

module.exports = geocode