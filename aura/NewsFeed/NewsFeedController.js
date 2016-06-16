({
	showNews : function(component, event, helper) {
        var type = component.get("v.type");
        var types = component.get("v.types");
        var typeOpts = [];

        for (var i = 0; i < types.length; i++) {
            typeOpts.push({label: types[i], value: types[i], selected: types[i] === type});
        }
        component.find("typeSelect").set("v.options", typeOpts);

        var section = component.get("v.section");
        var sections = component.get("v.sections");
        var typeSections = [];

        for (var j = 0; j < sections.length; j++) {
            typeSections.push({label: sections[i], value: sections[i], selected: sections[i] === section});
        }
        component.find("sectionSelect").set("v.options", typeSections);

		helper.goHideExternalNews(component, event, helper);
        helper.onChangeType(component, event, helper);
	},

    onChangeType : function(component, event, helper) {
        helper.onChangeType(component, event, helper);
    },

    onChangeSection : function(component, event, helper) {
        var sectionSelect = component.find("sectionSelect");
        var section = sectionSelect.get("v.value");
        component.set("v.section", section);

        helper.goGetExternalNews(component, event, helper);
    },

    goGetInternalNews : function(component, event, helper) {
		helper.goHideExternalNews(component, event, helper);
        helper.onChangeType(component, event, helper);
	},

    goGetExternalNews : function(component, event, helper) {
        helper.goHideInternalNews(component, event, helper);
		helper.goGetExternalNews(component, event, helper);
	},

    goHideInternalNews : function(component, event, helper) {
    	helper.goHideInternalNews(component, event, helper);
    },

    goHideExternalNews : function(component, event, helper) {
    	helper.goHideExternalNews(component, event, helper);
    }
})
