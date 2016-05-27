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
		    Map<String, Object>  specificWeather = (Map<String, Object>)generalWeather.get('current_observation');

	      return specificWeather;
    }
}