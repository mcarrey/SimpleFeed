({
	hideAll : function(component, event, helper) {
        var divHome = component.find("home");
        var divNews = component.find("news");
       	var divCalendar = component.find("calendar");
        var divWeather = component.find("weather");
        var divNotes = component.find("notes");
        var divOptions = component.find("options");

        $A.util.addClass(divHome, "toggle");
        $A.util.addClass(divNews, "toggle");
        $A.util.addClass(divCalendar, "toggle");
        $A.util.addClass(divWeather, "toggle");
        $A.util.addClass(divNotes, "toggle");
        $A.util.addClass(divOptions, "toggle");
    }
})