({
	goGetGeneralWeather : function(component, event, helper) {
        var action = component.get("c.getWeather");

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var weatherNow = response.getReturnValue();

                var otGeneralWeather = component.find("generalWeather");
                var otGeneralTemperatureF = component.find("generalTemperatureF");
                var otGeneralTemperatureC = component.find("generalTemperatureC");
                var otGeneralWindMph = component.find("generalWindMph");
                var otGeneralWindKph = component.find("generalWindKph");
                var otGeneralPrecipitation = component.find("generalPrecipitation");

                otGeneralTemperatureC.set("v.value", weatherNow.temp_c+'C');
                otGeneralTemperatureF.set("v.value", weatherNow.temp_f+'F');
                otGeneralWindMph.set("v.value", weatherNow.wind_mph+' Mph');
                otGeneralWindKph.set("v.value", weatherNow.wind_kph+' Kph');
                otGeneralWeather.set("v.value",  weatherNow.weather);
                otGeneralPrecipitation.set("v.value", weatherNow.precip_today_metric+'%');
                component.set("v.generalWeatherGif", "/resource/weather_gif/"+weatherNow.icon+".gif");
            }

            else if (state === "INCOMPLETE") {
                console.log("Incomplete.");
            }
                
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        })
        
        $A.enqueueAction(action);
    }
})