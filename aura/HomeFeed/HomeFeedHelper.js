({
    hideAllHome : function(component, event, helper) {
        var otHomeMyNotes = component.find("homeMyNotes");
        var otHomeShowNotes = component.find("homeShowNotes");
        var otHomeHideNotes = component.find("homeHideNotes");
        
        $A.util.addClass(otHomeMyNotes, "toggle");
        $A.util.addClass(otHomeShowNotes, "toggle");
        $A.util.addClass(otHomeHideNotes, "toggle");
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
    
    goGetNotes : function(component, event, helper) {
        var otHomeHasNotes = component.find("homeHasNotes");
        
    	var action = component.get("c.getNotes");
        
        action.setCallback(this, function(response) {
            var state = response.getState();

            if (state === "SUCCESS") {
                
                if (response.getReturnValue() === null) {
                	otHomeHasNotes.set("v.value", 'There are no saved notes.');
                } else {
                    var otHomeShowNotes = component.find("homeShowNotes");
                    var otHomeMyNotes = component.find("homeMyNotes");
                    
                    otHomeHasNotes.set("v.value", 'You have notes.');
                    otHomeMyNotes.set("v.value", response.getReturnValue());
                    
                    $A.util.removeClass(otHomeShowNotes, "toggle");
                }
            }

            else if (state === "INCOMPLETE") {
                console.log("Incomplete.");
                otHomeHasNotes.set("v.value", ' - Loading incomplete -');
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
                otHomeHasNotes.set("v.value", ' - Loading error -');
        	}
        })
        $A.enqueueAction(action);
    },
    
    goShowNotes : function(component, event, helper) {
        var otHomeMyNotes = component.find("homeMyNotes");
        var otHomeShowNotes = component.find("homeShowNotes");
        var otHomeHideNotes = component.find("homeHideNotes");

        $A.util.addClass(otHomeShowNotes, "toggle");
        $A.util.removeClass(otHomeHideNotes, "toggle");
        $A.util.removeClass(otHomeMyNotes, "toggle");
    },
    
    goHideNotes : function(component, event, helper) {
        var otHomeMyNotes = component.find("homeMyNotes");
        var otHomeShowNotes = component.find("homeShowNotes");
        var otHomeHideNotes = component.find("homeHideNotes");

        $A.util.removeClass(otHomeShowNotes, "toggle");
        $A.util.addClass(otHomeHideNotes, "toggle");
        $A.util.addClass(otHomeMyNotes, "toggle");
    }
})