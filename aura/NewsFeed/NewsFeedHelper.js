({
	goGetInternalNews : function(component, event, helper) {
		
	},
    
    goGetExternalNews : function(component, event, helper) {
		var action = component.get("c.getNewYorkTimesNews");
        var otGeneralNews = component.find("generalNews");
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var newsNow = response.getReturnValue();
                /*createComponentController.js*/
				
                var i = 0;
                
                while (newsNow[i] != null && i<5){
                    $A.createComponent(
                        "ui:outputText",
                        {
                           "value" : newsNow[i].abstract+'\n \n'
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
                    
                    $A.createComponent(
                        "ui:outputURL",
                        {
                           "value" : newsNow[i].url+'\n\n'
                        },
                        function(newOutputURL){
                            //Add the new button to the body array
                            if (component.isValid()) {
                                var body = component.get("v.body");
                                body.push(newOutputURL);
                                component.set("v.body", body);
                            }
                        }
                    );
                    
                    i++;
                }
                
            }

            else if (state === "INCOMPLETE") {
                console.log("Incomplete.");
                otGeneralNews.set("v.value", "Incomplete.");
            }
                
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
                
                otGeneralNews.set("v.value", "Error.");
            }
        })
        
        $A.enqueueAction(action);
	},
})