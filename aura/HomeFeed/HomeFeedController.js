({
	showHome : function(component, event, helper) {
    	helper.hideAllHome(component, event, helper);
    	helper.goGetUserFirstName(component, event, helper);
        helper.goGetHomeEvents(component, event, helper);
    	helper.goGetHomeWeather(component, event, helper);
    	helper.goGetNotes(component, event, helper);
    },
    
    hideAllHome : function(component, event, helper) {
    	helper.hideAllHome(component, event, helper);
    },
    
    goGetUserFirstName : function(component, event, helper) {
    	helper.goGetUserFirstName(component, event, helper);
    },
    
    goGetHomeEvents: function(component,event,helper){
        helper.goGetHomeEvents(component);
    },

    goGetHomeWeather : function(component, event, helper) {
    	helper.goGetHomeWeather(component, event, helper);
    },
    
    goGetNotes : function(component, event, helper) {
    	helper.goGetNotes(component, event, helper);
    },
    
    goShowNotes : function(component, event, helper) {
    	helper.goShowNotes(component, event, helper);
    },
    
    goHideNotes : function(component, event, helper) {
    	helper.goHideNotes(component, event, helper);
    }
})