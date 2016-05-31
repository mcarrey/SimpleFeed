({
	showHomeDiv : function(component, event, helper) {
        var divHome = component.find("home");
        
        helper.hideAll(component, event, helper);
        $A.util.removeClass(divHome, "toggle");
        
        var appEvent = $A.get("e.c:HomeFeedEvent");
		appEvent.fire();
    },
    
    showCalendarDiv : function(component, event, helper) {
        var divCalendar= component.find("calendar");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divCalendar, "toggle");
    },

    showWeatherDiv : function(component, event, helper) {
        var divWeather= component.find("weather");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divWeather, "toggle");
        
        var appEvent = $A.get("e.c:WeatherFeedEvent");
		appEvent.fire();
    },

    showNewsDiv : function(component, event, helper) {
        var divNews= component.find("news");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divNews, "toggle");
    },

    showNotesDiv : function(component, event, helper) {
        var divNotes= component.find("notes");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divNotes, "toggle");
        
        var appEvent = $A.get("e.c:NotesFeedEvent");
		appEvent.fire();
    },
    
    hideAll : function(component, event, helper) {
    	helper.hideAll(component, event, helper);
	}
})