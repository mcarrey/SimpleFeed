({
	showHomeDiv : function(component, event, helper) {
        var divHome = component.find("home");
        
        helper.hideAll(component, event, helper);
        $A.util.removeClass(divHome, "toggle");
        
        var appEvent = $A.get("e.c:HomeFeedEvent");
		appEvent.fire();
    },

    showNewsDiv : function(component, event, helper) {
        var divNews= component.find("news");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divNews, "toggle");
        
        var appEvent = $A.get("e.c:NewsFeedEvent");
		appEvent.fire();
    },
    
    showCalendarDiv : function(component, event, helper) {
        var divCalendar= component.find("calendar");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divCalendar, "toggle");
        
        var appEvent = $A.get("e.c:CalendarFeedEvent");
		appEvent.fire();
    },

    showWeatherDiv : function(component, event, helper) {
        var divWeather= component.find("weather");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divWeather, "toggle");
        
        var appEvent = $A.get("e.c:WeatherFeedEvent");
		appEvent.fire();
    },

    showNotesDiv : function(component, event, helper) {
        var divNotes= component.find("notes");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divNotes, "toggle");
        
        var appEvent = $A.get("e.c:NotesFeedEvent");
		appEvent.fire();
    },
    
    showOptionsDiv : function(component, event, helper) {
        var divOptions= component.find("options");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divOptions, "toggle");
        
        var appEvent = $A.get("e.c:OptionsFeedEvent");
		appEvent.fire();
    },
    
    hideAll : function(component, event, helper) {
    	helper.hideAll(component, event, helper);
	}
})