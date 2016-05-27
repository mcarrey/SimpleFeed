({
    hideAll : function(component, event, helper) {
        var divHome = component.find("home");
       	var divCalendar = component.find("calendar");
        var divWeather = component.find("weather");
        var divNews = component.find("news");
        var divNotes = component.find("notes");

        $A.util.addClass(divHome, "toggle");
        $A.util.addClass(divCalendar, "toggle");
        $A.util.addClass(divWeather, "toggle");
        $A.util.addClass(divNews, "toggle");
        $A.util.addClass(divNotes, "toggle");
    },

    goGetUserFirstName : function(component, event, helper) {
    	var action = component.get("c.getUserFirstName");

        action.setCallback(this, function(response) {
            var state = response.getState();

            if (state === "SUCCESS") {
                var otHomeHello = component.find("homeHello");

                otHomeHello.set("v.value", 'Hello, '+response.getReturnValue()+'!');
            }

            else if (state === "INCOMPLETE") {
                console.log("Incomplete.");
            }

            else if (state === "ERROR") {
            	var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                    errors[0].message);
                    }
                } else {
                	console.log("Unknown error");
            	}
        	}
        })
        $A.enqueueAction(action);
    },

    goGetHomeWeather : function(component, event, helper) {
        var action = component.get("c.getWeather");

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var weatherNow = response.getReturnValue();

                var otHomeTemperatureC = component.find("homeTemperatureC");
                var otHomeTemperatureF = component.find("homeTemperatureF");

                otHomeTemperatureC.set("v.value", weatherNow.temp_c+'C');
                otHomeTemperatureF.set("v.value", weatherNow.temp_f+'F');
                component.set("v.homeWeatherGif", "/resource/weather_gif/"+weatherNow.icon+".gif");
            }

            else if (state === "INCOMPLETE") {
                console.log("Incomplete.");
            }

            else if (state === "ERROR") {
            	var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                    errors[0].message);
                    }
                } else {
                	console.log("Unknown error");
            	}
        	}
        })
        $A.enqueueAction(action);
    },

    goGetGeneralWeather : function(component, event, helper) {
        var action = component.get("c.getWeather");

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var weatherNow = response.getReturnValue();

                var otGeneralTemperatureC = component.find("generalTemperatureC");
                var otGeneralTemperatureF = component.find("generalTemperatureF");
                var otGeneralWindMph = component.find("generalWindMph");
                var otGeneralWindKph = component.find("generalWindKph");
                var otGeneralWeather = component.find("generalWeather");
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
                            console.log("Error message: " +
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        })
        $A.enqueueAction(action);
    }
})