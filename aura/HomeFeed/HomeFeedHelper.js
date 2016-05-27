({
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
    }
})