const path = require("path");
const express = require("express");
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


const app = express();

//Define paths for Express config
const publicDir = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");


//Setup handlevars engine and views location
app.set('view engine', 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));


app.get("/",(req,res)=>{
    res.render("index",{
        title:"Weather app",
        name: 'Vlad'
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About me",
        name: 'Vlad'
    })
})
app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        name: 'Vlad'
    })
})
app.get("/weather",(req,res)=>{
    if(!req.query.address){
       return res.send({
            error: "No address provided"
       })
    }
    geocode(req.query.address,(error, {longitude, latitude, location}={})=>{
        if(error){        
            return res.send({
                error
           })
        }
        forecast(longitude, latitude, (error, forcastData) => {
            if(error){            
                return res.send({
                    error: error
               })
            }
            res.send({
                location,
                forcastData
            });
        })
    })
})
app.get("/products",(req,res)=>{
    console.log(req.query);
    res.send({
        products:[]
    });
})
app.get('/help/*',(req,res)=>{
    res.render("404",{
        title: '404',
        text: "help article not found",
        name: 'Vlad'
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title: '404',
        text: "help article not found",
        name: 'Vlad'
    })
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000.");
})