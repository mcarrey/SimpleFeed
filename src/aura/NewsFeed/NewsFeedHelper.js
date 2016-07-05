({
    onChangeType : function(component, event, helper) {
        var typeSelect = component.find("typeSelect");
        var type = typeSelect.get("v.value");
        component.set("v.type", type);
		
        $A.createComponent("forceChatter:feed", {"type": type}, function(feed) {
            var feedContainer = component.find("feedContainer");
            feedContainer.set("v.body", feed);	
        });
    },
    
    goHideInternalNews : function(component, event, helper) {
        var divInternalNews = component.find("internalNews");
        var divExternalNews = component.find("externalNews");

        $A.util.addClass(divInternalNews, "toggle");
        $A.util.removeClass(divExternalNews, "toggle");
    },
    
    goHideExternalNews : function(component, event, helper) {
        var divInternalNews = component.find("internalNews");
        var divExternalNews = component.find("externalNews");

        $A.util.addClass(divExternalNews, "toggle");
        $A.util.removeClass(divInternalNews, "toggle");
        
        component.set("v.body", []);
    },
    
    goGetExternalNews : function(component, event, helper) {
        component.set("v.body", []);
        
        var otGeneralNews = component.find("generalNews");
        var sectionSelect = component.find("sectionSelect");
        var section = sectionSelect.get("v.value");
        
		var action = component.get("c.getNewYorkTimesNews");
        action.setParams({ section : section.toLowerCase() });

        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                //var newsNow = response.getReturnValue();
                var newsNow = JSON.parse( response.getReturnValue() );
                
                if (newsNow == null || newsNow === '') {
                    $A.createComponent(
                            "ui:outputText",
                            {
                                "value" : ' API not working at the moment.\n'
                            },
                            function(newOutputText){
                                if (component.isValid()) {
                                    var body = component.get("v.body");
                                    body.push(newOutputText);
                                    component.set("v.body", body);
                                }
                            }
                        );
                } else {
                    var i = 0;
                    
                    while (newsNow.results[i] != null && i<10){
                       	$A.createComponent(
                            "ui:outputText",
                            {
                                "value" : newsNow.results[i].title+'\n',
                                "class" : "boldText"
                            },
                            function(newOutputText){
                                if (component.isValid()) {
                                    var body = component.get("v.body");
                                    body.push(newOutputText);
                                    component.set("v.body", body);
                                }
                            }
                        );
                        
                        $A.createComponent(
                            "ui:outputText",
                            {
                                "value" : newsNow.results[i].abstract+'\n'
                            },
                            function(newOutputText){
                                if (component.isValid()) {
                                    var body = component.get("v.body");
                                    body.push(newOutputText);
                                    component.set("v.body", body);
                                }
                            }
                        );
                        
                        $A.createComponent(
                            "ui:outputURL",
                            {	"label" : 'Link \n \n',
                               	"value" : newsNow.results[i].short_url,
                             	"target" : "_blank "
                            },
                            function(newOutputURL){
                                if (component.isValid()) {
                                    var body = component.get("v.body");
                                    body.push(newOutputURL);
                                    component.set("v.body", body);
                                }
                            }
                        );
                        
                        $A.createComponent(
                            "ui:outputText",
                            {
                                "value" : '\n \n'
                            },
                            function(newOutputText){
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
            }

            else if (state === "INCOMPLETE") {
                otGeneralNews.set("v.value", "Incomplete.");
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
                
                otGeneralNews.set("v.value", "Error.");
            }
        })
        
        $A.enqueueAction(action);
	}
})