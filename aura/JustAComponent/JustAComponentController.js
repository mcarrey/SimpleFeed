({
    showHome : function(component, event, helper) {
        var divHome = component.find("home");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divHome, "toggle");

    	helper.goGetUserFirstName(component, event, helper);
    	helper.goGetHomeWeather(component, event, helper);
    },

    showCalendar : function(component, event, helper) {
        var divCalendar= component.find("calendar");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divCalendar, "toggle");
    },

    showWeather : function(component, event, helper) {
        var divWeather= component.find("weather");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divWeather, "toggle");
        helper.goGetGeneralWeather(component, event, helper);
    },

    showNews : function(component, event, helper) {
        var divNews= component.find("news");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divNews, "toggle");
    },

    showNotes : function(component, event, helper) {
        var divNotes= component.find("notes");

        helper.hideAll(component, event, helper);
        $A.util.removeClass(divNotes, "toggle");
    },

    hideAll : function(component, event, helper) {
    	helper.hideAll(component, event, helper);
	},

    goGetUserFirstName : function(component, event, helper) {
    	helper.goGetUserFirstName(component, event, helper);
    },

    goGetHomeWeather : function(component, event, helper) {
    	helper.goGetHomeWeather(component, event, helper);
    },

    goGetGeneralWeather : function(component, event, helper) {
    	helper.goGetGeneralWeather(component, event, helper);
    }
    
})
