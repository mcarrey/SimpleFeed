({
	hideAllNotes : function(component, event, helper) {
        var otStatusNotes = component.find("statusNotes");
        
        otStatusNotes.set("v.value", '');
    },
    
    loadNotes : function(component, event, helper) {
		var action = component.get("c.getNotes");
        
        action.setCallback(this, function(response) {
            var otStatusNotes = component.find("statusNotes");
            
            var state = response.getState();

            if (state === "SUCCESS") {
                var itMyNotes = component.find("myNotes");
                if (response.getReturnValue() === null) {
                	otStatusNotes.set("v.value", ' - No saved notes yet! -');
                    itMyNotes.set("v.value", '');
                } else {
                    itMyNotes.set("v.value", response.getReturnValue());
                }
            }

            else if (state === "INCOMPLETE") {
                otStatusNotes.set("v.value", ' - Loading incomplete -');
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
                otStatusNotes.set("v.value", ' - Loading error -');
        	}
        })
        $A.enqueueAction(action);
	},
    
    saveNotes : function(component, event, helper) {
        var otStatusNotes = component.find("statusNotes");
        var itMyNotes = component.find("myNotes");
        
		var action = component.get("c.setNotes");
        action.setParams({ text : itMyNotes.get("v.value") });
        
        action.setCallback(this, function(response) {
            var state = response.getState();

            if (state === "SUCCESS") {
                otStatusNotes.set("v.value", ' - Notes saved! -');
            }

            else if (state === "INCOMPLETE") {
                otStatusNotes.set("v.value", ' - Notes could not be saved -');
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
                otStatusNotes.set("v.value", ' - There was an error -');
        	}
        })
        $A.enqueueAction(action);
	}
})