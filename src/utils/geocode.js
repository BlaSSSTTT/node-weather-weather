const request = require("request");

function geocode(address, callback){
    const url = "https://api.mapbox.com/search/geocode/v6/forward?q="+encodeURIComponent(address)+"&access_token=pk.eyJ1IjoiYmxhc3NzdHR0IiwiYSI6ImNseHNyd2VtYjFscHkyaXNlOXVzdzQweHYifQ.0RpAksRGucQgw7pXOLoo5Q&limit=1";
    request({url, json:true},(err, {body}={})=>{
        if(err){
            callback("Unable to connect to location services!", undefined);
        }else if(body.features.length===0){
            callback("Unable to find location. Try another search.", undefined);
        }else{
            const data = {
                latitude: body.features[0].properties.coordinates.latitude,
                longitude:body.features[0].properties.coordinates.longitude,
                location: body.features[0].properties.full_address
            }
            callback(undefined, data);
        }
                
    })
}

module.exports=geocode;