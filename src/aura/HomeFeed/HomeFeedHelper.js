({
    hideAllHome : function(component, event, helper) {
        var otHomeMyNotes = component.find("homeMyNotes");
        var otHomeShowNotes = component.find("homeShowNotes");
        var otHomeHideNotes = component.find("homeHideNotes");
        
        $A.util.addClass(otHomeMyNotes, "toggle");
        $A.util.addClass(otHomeShowNotes, "toggle");
        $A.util.addClass(otHomeHideNotes, "toggle");
        
        component.set("v.body", []);
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
                // Manage state
            }

            else if (state === "ERROR") {
            	var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        // Manage state
                    }
                } else {
                	// Manage state
            	}
        	}
        })
        $A.enqueueAction(action);
    },
    
    goGetHomeEvents: function(component) {
        
        var action = component.get("c.getEvents"); 
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if(component.isValid() && state === "SUCCESS"){
                if (response.getReturnValue() != null) {
                    var responseEvents = this.tranformToFullCalendarFormat(component, response.getReturnValue());
                    this.loadDataToCalendar(component, responseEvents);
                    component.set("v.calendarEvents", responseEvents);
                }
            }

            else if (state === "INCOMPLETE") {
                // Manage state
            }

            else if (state === "ERROR") {
            	var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        // Manage state
                    }
                } else {
                	// Manage state
            	}
        	}
        });

        $A.enqueueAction(action); 
    },

    tranformToFullCalendarFormat : function(component, events) {
        var eventArray = [];
        
        for(var i = 0;i < events.length;i++){
            eventArray.push({
                'id':events[i].Id,
                'start':events[i].StartDateTime,
                'end':events[i].EndDateTime,
                'title':events[i].Subject
            });
        }
        return eventArray;
    },
    
    loadDataToCalendar :function(component, data){      
        var divCalendar = component.find("calendar").getElement();
        //var divCalendar = $( "calendar" );
        
        var today = new Date();
        var year = today.getFullYear();        
        var month = today.getMonth()+1;        
        var day = today.getDate();
        
        /*divCalendar.fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: ''
            },
            defaultDate: year+'-'+month+'-'+day,
            defaultView: 'basicDay',
            editable: true,
            eventLimit: true,
            events:data,
            eventColor: '#CFD7E6'
        });
        
        divCalendar.fullCalendar('render');*/
        
        console.log('jquery: '+ $(divCalendar).text() );
        $(divCalendar).fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: ''
            },
            defaultDate: year+'-'+month+'-'+day,
            defaultView: 'basicDay',
            editable: true,
            eventLimit: true,
            events:data,
            eventColor: '#CFD7E6'
        });
        
        $(divCalendar).fullCalendar('render');
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
                // Manage state
            }

            else if (state === "ERROR") {
            	var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        // Manage state
                    }
                } else {
                	// Manage state
            	}
        	}
        })
        $A.enqueueAction(action);
    },
    
    goGetNotes : function(component, event, helper) {
        var otHomeHasNotes = component.find("homeHasNotes");
        var self = this;
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
                    
                    var finalNotes = self.formatNotes(component, response.getReturnValue());

                    otHomeMyNotes.set("v.value", finalNotes);
                    
                    $A.util.removeClass(otHomeShowNotes, "toggle");
                }
            }

            else if (state === "INCOMPLETE") {
                otHomeHasNotes.set("v.value", ' - Loading incomplete -');
            }

            else if (state === "ERROR") {
            	var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        // Manage state
                    }
                } else {
                	// Manage state
            	}
                otHomeHasNotes.set("v.value", ' - Loading error -');
        	}
        })
        $A.enqueueAction(action);
    },
    
    formatNotes : function(component, data) {
        var finalText = '';
        var longWord = data.split(' ')[0];
        
        // Check if the text has a long first word
        if (longWord.length > 45)  {
            finalText = data.substring(0, 45) + '...';
        } else {
            // Cut the first 4 lines
            var firstLine = data.split('\n')[0] + '\n';
            var secondLine = '';
            var thirdLine = '';
            var fourthLine = '';
            
            if (data.split('\n')[1] != null) {
                secondLine = data.split('\n')[1] + '\n';
                
                if (data.split('\n')[2] != null) {
                    thirdLine = data.split('\n')[2] + '\n';
                    
                    if (data.split('\n')[3] != null) {
                        fourthLine = data.split('\n')[3];
                    }
                }
            }
            
            var shortText = firstLine + secondLine + thirdLine + fourthLine;
            
            // If the text is long, cut string to display only first 200 characters
            if (shortText.length > 250) {
                finalText = shortText.substring(0, 250) + '...';
            } else {
                // If the response has more than 4 lines we add an ellipsis
                if (data.split('\n')[4] != null) {
                   finalText = shortText + '...';
                } else {
                    finalText = shortText;
                }
            }
        }
        
        return finalText;
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
    },
    
    goGetHistoryEvents : function(component, event, helper) {
		var action = component.get("c.getHistoryEvents");

        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var todayOnHistory = response.getReturnValue();
                
                var i = 0;
                
                while (todayOnHistory[i] != null && i<10){
                    
                	var todayOnHistoryLink = todayOnHistory[i].links;
                    
                    $A.createComponent(
                        "ui:outputText",
                        {
                           "value" : '- ' + todayOnHistory[i].year + ', ' + todayOnHistory[i].text + '\n \n'
                        },
                        function(newOutputText){
                            //Add the new button to the body array
                            if (component.isValid()) {
                                var body = component.get("v.body");
                                body.push(newOutputText);
                                component.set("v.body", body);
                            }
                        }
                    );
                    
                    i++;
                }
                
            }

            else if (state === "INCOMPLETE") {
            }
                
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        // Manage state
                    }
                } else {
                    // Manage state
                }
            }
        })
        
        $A.enqueueAction(action);
	}
})