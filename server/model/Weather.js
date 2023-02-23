const OpenWeatherMapHelper = require("openweathermap-node");
var attitute
const helper = new OpenWeatherMapHelper(
	{
		APPID: "450264e2e4685e3f3466841f7bfbf1ac",
		units: "metric",
		lang: "en"
	}
);
var currentWeather=helper.getCurrentWeatherByGeoCoordinates(5.6037, 0.1870, (err, currentWeather) => {
	if(err){
		console.log(err);
	}
	else{
		console.log(currentWeather);
	}
});