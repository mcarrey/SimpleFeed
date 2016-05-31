({
	showHome : function(component, event, helper) {
    	helper.hideAllHome(component, event, helper);
    	helper.goGetUserFirstName(component, event, helper);
    	helper.goGetHomeWeather(component, event, helper);
    	helper.goGetNotes(component, event, helper);
    },
    
    hideAllHome : function(component, event, helper) {
    	helper.hideAllHome(component, event, helper);
    },
    
    goGetUserFirstName : function(component, event, helper) {
    	helper.goGetUserFirstName(component, event, helper);
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