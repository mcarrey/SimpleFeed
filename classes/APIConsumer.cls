public with sharing class APIConsumer {
    @AuraEnabled
    public static String getUserFirstName() {
        return UserInfo.getFirstName();
    }

    @AuraEnabled
    public static Map<String,Object> getWeather() {
        Http h = new Http();

        HttpRequest req = new HttpRequest();
        req.setEndpoint('http://api.wunderground.com/api/4bbcacf38d0c2416/geolookup/conditions/q/UY/Montevideo.json');
        req.setMethod('GET');

        HttpResponse res = h.send(req);

        Map<String, Object> generalWeather = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
        Map<String, Object> specificWeather = (Map<String, Object>)generalWeather.get('current_observation');

        return specificWeather;
    }
    
    @AuraEnabled
    public static String getNotes() {
        List<MyNotes__c> notes = [SELECT Id, Content__c
                            FROM MyNotes__c
                            WHERE CreatedById =: UserInfo.getUserId()
                            LIMIT 1];
        
        if (notes.size() > 0) {
        	return notes[0].Content__c;
        } else {
            return null;
        }
    }
    
    @AuraEnabled
    public static void setNotes(String text) {
        List<MyNotes__c> notes = [SELECT Id, Content__c
                            FROM MyNotes__c
                            WHERE CreatedById =: UserInfo.getUserId()
                            LIMIT 1];
        
        if (notes.size() > 0) {
            notes[0].Content__c = text;
            
            update notes[0];
        } else {
            // No notes.
            MyNotes__c newNote = new MyNotes__c();
            newNote.Content__c = text;
            
            insert newNote;
        }
    }
    
    @AuraEnabled
    public static List<Event> getEvents(){
        return [SELECT Id, StartDateTime, EndDateTime, Subject 
                FROM Event WHERE OwnerId =: UserInfo.getUserId()];
    }
    
    @AuraEnabled
    public static List<Object> getNewYorkTimesNews(){
        Http h = new Http();

        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=15d94aec580b4aac97fb4b088a8eba28');
        req.setMethod('GET');

        HttpResponse res = h.send(req);

        System.debug('body: \n' + res.getBody());
        
        Map<String, Object> generalNews = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());

        List<Object> specificNews = (List<Object>)generalNews.get('results');
        
        System.debug('generalNews: \n' + generalNews);
        
        System.debug('specificNews: ' + specificNews);
        
        return specificNews;
    }
}