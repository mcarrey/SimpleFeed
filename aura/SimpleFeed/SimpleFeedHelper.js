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
    }
})