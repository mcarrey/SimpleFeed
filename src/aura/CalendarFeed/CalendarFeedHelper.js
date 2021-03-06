({
    goGetEvents: function(component) {
        var action = component.get("c.getEvents"); 
        var self = this;
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if(component.isValid() && state === "SUCCESS"){
                if (response.getReturnValue() != null) {
                    var responseEvents = self.tranformToFullCalendarFormat(component, response.getReturnValue());
                    
                    self.loadDataToCalendar(component, responseEvents);
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
        var divCalendar = component.find('calendar').getElement();
        
        var today = new Date();
        var year = today.getFullYear();        
        var month = today.getMonth()+1;        
        var day = today.getDate();
        
        // $A.util.addClass(cmpTarget, 'changeMe');

        $(divCalendar).fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek'
            },
            defaultDate: year+'-'+month+'-'+day,
            editable: true,
            eventLimit: true,
            events:data,
            eventColor: '#CFD7E6'
        });
        debugger;
        $(divCalendar).fullCalendar('render');
    }
})