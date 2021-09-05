const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");



const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    
    res.sendFile(__dirname+"/index4.html")
     
        });

   app.post("/",function(req,res){
    const city=req.body.cityName;

    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a91e41e0007ad148fdcbb00b4a042ac9&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
        const weatherdata=JSON.parse(data);
        const temp = weatherdata.main.temp;
        const desc=weatherdata.weather[0].description;
        const icon=weatherdata.weather[0].icon;
        const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      
        res.write("<h1>The temperature in  "+city +" is "+temp+" celcius</h1>");
        res.write("<p>The weather description is "+ desc+"</p>");
        res.write("<img src="+imageUrl+">")
        res.send();

        });
    });
    });

    
    



app.listen(3000,function(){
    console.log("server is running");
});
