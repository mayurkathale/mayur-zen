$(document).ready(function(){setTimeout(function(){$(".angular-google-map-container").height($("#right-content").height())},3e3),$(window).resize(function(){$(window).width()>"767"&&$(".angular-google-map-container").height($("#right-content").height())})}),angular.module("tweetsOnMapApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","uiGmapgoogle-maps","satellizer","angular-cache","ui.router"]).config(["$routeProvider","$authProvider","$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c,d,e){b.linkedin({clientId:"WWboRCBkqoRDqwPE26hAAe3pt"}),d.otherwise("main"),e.hashPrefix("!"),c.state("main",{templateUrl:"views/main.html",controller:"MainCtrl",url:"/main"})}]).constant("apiUrl","https://mayurkathale.com/t/web/app.php/api/v1").constant("authLink","https://api.twitter.com/oauth/authorize?oauth_token=").run(["$http","CacheFactory",function(a,b){a.defaults.cache=b("httpCache",{maxAge:36e5,deleteOnExpire:"aggressive"})}]),angular.module("tweetsOnMapApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("tweetsOnMapApp").controller("SearchresultCtrl",["$scope","$rootScope",function(a,b){a.list=[],a.$watch(function(){return b.resultlist},function(c,d){a.list=b.resultlist},!0)}]),angular.module("tweetsOnMapApp").controller("HistoryCtrl",["$scope","$rootScope","apiService",function(a,b,c){a.history=[],c.getHistory().then(function(b){a.history=b}),a.search=function(a){b.$emit("CallSearchMethod",{q:a})},b.$on("updateHistory",function(b,c){a.history=c.history})}]),angular.module("tweetsOnMapApp").controller("MapCtrl",["$scope","$rootScope",function(a,b){b.latitude=18.5245649,b.longitude=73.7228812,a.map={center:{latitude:b.latitude,longitude:b.longitude},zoom:11},a.markersOnMap=[],a.$watch(function(){return b.latitude},function(c,d){a.map={center:{latitude:b.latitude,longitude:b.longitude},zoom:12,markersEvents:{click:function(b,c,d,e){a.map.window.model=d,a.map.window.show=!0}},window:{model:{},show:!1,options:{pixelOffset:{width:-1,height:-20}}}}}),a.$watch(function(){return b.resultlist},function(c,d){if(a.markersOnMap=[],void 0!=b.resultlist)for(var e=0;e<b.resultlist.length;e++)null!=b.resultlist[e].geo&&a.markersOnMap.push({latitude:b.resultlist[e].geo.coordinates[0],longitude:b.resultlist[e].geo.coordinates[1],title:"m"+e,id:"m"+e,icon:b.resultlist[e].user.profile_image_url,text:b.resultlist[e].text,name:b.resultlist[e].user.name})},!0)}]).controller("templateController",function(){}).config(["uiGmapGoogleMapApiProvider",function(a){a.configure({key:"AIzaSyCcJIJsH6jGODiXH92tQcUIEXImUGDQK5s",v:"3.22",libraries:"weather,geometry,visualization"})}]),angular.module("tweetsOnMapApp").controller("NavCtrl",["$scope","$location","$auth","$cookies","$rootScope","authLink","apiService","twitterFactory",function(a,b,c,d,e,f,g,h){var i=b.search().oauth_token,j=b.search().oauth_verifier,k=($("input#ex1").bootstrapSlider({tooltip_position:"bottom"}),d.getObject("oauth_data"));a.authdata=k;var l=d.getObject("access_token_data"),m=d.getObject("user_data");a.userdata=m,a.showSignIn=!1,a.showUser=!1,a._getAccessToken=function(b,c,e){g.getAccessToken(b,c,e).then(function(b){d.putObject("access_token_data",b),a._getUserData(b)})},a._getUserData=function(b){g.getUserData(b).then(function(b){b=JSON.parse(b.data);var c={picture:b.profile_image_url,name:b.name};d.putObject("user_data",c),a.userdata=c,a.showSignIn=!1,a.showUser=!0})},void 0==m?(void 0==k&&void 0==i&&void 0==j&&h.initialize().then(function(b){a.authdata=b,d.putObject("oauth_data",a.authdata)}),void 0!=i&&void 0!=j&&void 0==l&&void 0!=k&&a._getAccessToken(i,k.auth_token_secret,j)):(a.userdata=m,a.showUser=!0,a.showSignIn=!1),a.$watch(function(){return a.authdata},function(b,c){void 0!=a.authdata&&($("#btn-sign-in").attr("href",f+a.authdata.auth_token),a.showSignIn=!0)},!0),a.$watch(function(){return a.userdata},function(b,c){void 0!=a.userdata&&(a.showSignIn=!1,a.showUser=!0)},!0),a.prepareSearchQuery=function(a){var b,c=a.replace(/\s\s+/g," ");a=a.replace(/\s+/,"");var d=a;return b=c.match(" ")?"q="+c.replace(/ /g,"+")+"+"+d:"q="+c.replace(/ /g,"+")},a.search=function(b){var c=a.prepareSearchQuery(b);g.searchPlace(c).then(function(b){if(b.length>0){g.saveHistory(a.searchCity).then(function(a){g.getHistory().then(function(a){e.$emit("updateHistory",{history:a})})}),e.latitude=b[0].geometry.location.lat,e.longitude=b[0].geometry.location.lng;var d=$("input#ex1").val(),f=b[0].geometry.location.lat+","+b[0].geometry.location.lng+","+d+"km";g.search(l,c,f).then(function(b){a.tweets=JSON.parse(b),e.resultlist=a.tweets.statuses})}})},e.$on("CallSearchMethod",function(b,c){a.search(c.q)})}]),angular.module("tweetsOnMapApp").factory("twitterFactory",["$q","$cookies","apiService",function(a,b,c){return{initialize:function(){return c.auth().then(function(a){return b.putObject("auth",a),a})}}}]),angular.module("tweetsOnMapApp").service("user",function(){}),angular.module("tweetsOnMapApp").service("history",function(){}),angular.module("tweetsOnMapApp").directive("ngEnter",function(){return function(a,b,c){b.bind("keydown keypress",function(b){13===b.which&&(a.$apply(function(){a.$eval(c.ngEnter)}),b.preventDefault())})}}),angular.module("tweetsOnMapApp").service("apiService",["$http","$q","apiUrl",function(a,b,c){this.auth=function(){return a.get(c+"/auth").then(function(a){return a.data})},this.getAccessToken=function(b,d,e){return a.post(c+"/accesstoken",{oauth_token:b,oauth_token_secret:d,oauth_verifier:e}).then(function(a){return a.data})},this.getUserData=function(b){return a.post(c+"/user",b).then(function(a){return a})},this.search=function(b,d,e){return console.log(b),a({url:c+"/searchtweets",method:"GET",params:{oauth_token:b.oauth_token,oauth_token_secret:b.oauth_token_secret,query:d,latlong:e,count:100}},{cache:!0}).then(function(a){return a.data})},this.searchPlace=function(b){return a({url:"https://maps.googleapis.com/maps/api/geocode/json?address="+b,method:"GET"}).then(function(a){return a.data.results})},this.getHistory=function(){return a.get(c+"/history",{cache:!1}).then(function(a){return a.data})},this.saveHistory=function(b){return a.post(c+"/history",{searchfield:b}).then(function(a){return a.data})}}]),angular.module("tweetsOnMapApp").run(["$templateCache",function(a){"use strict";a.put("views/main.html","<ng-include src=\"'views/partials/head.html'\"></ng-include> <ng-include src=\"'views/partials/content.html'\"></ng-include>"),a.put("views/partials/content.html",'<div id="this-content" class="container-fluid"> <div class="row child-content"> <div id="right-content" class="col-lg-3 col-md-3 col-sm-4 right-content"> <ul class="nav nav-tabs text-center"> <li class="active"> <a href="#1" data-toggle="tab">Results</a> </li> <li> <a href="#2" data-toggle="tab">History</a> </li> </ul> <div class="tab-content"> <div class="tab-pane active" id="1"> <div id="search-list-box" class="left-list" ng-controller="SearchresultCtrl"> <ul> <li ng-repeat="twt in list" ng-show="list.length"> <img class="img-rounded" src="{{twt.user.profile_image_url}}">&nbsp;&nbsp;{{twt.text}} </li> <li ng-show="!list.length" class="text-center"> No search results. </li> </ul> </div> </div> <div class="tab-pane" id="2"> <div id="history-list-box" class="left-list" ng-controller="HistoryCtrl"> <ul> <li ng-repeat="obj in history" ng-click="search(obj.field)">{{obj.field}}</li> </ul> </div> </div> </div> </div> <div class="col-lg-9 col-md-9 col-sm-8 second"> <div id="map_canvas" ng-controller="MapCtrl"> <ui-gmap-google-map center="map.center" zoom="map.zoom"> <ui-gmap-window show="map.window.show" coords="map.window.model" options="map.window.options" closeclick="map.window.closeClick()" templateurl="\'views/partials/marker.html\'" templateparameter="map.window.model"> </ui-gmap-window> <ui-gmap-markers models="markersOnMap" coords="\'self\'" icon="\'icon\'" events="map.markersEvents" options="\'options\'"> </ui-gmap-markers> </ui-gmap-google-map> </div> </div> </div> </div>'),a.put("views/partials/head.html",'<div class="head"> <div class="navbar navbar-default" role="navigation" ng-controller="NavCtrl"> <div class="col-lg-3"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/">TweetsOnMap</a> </div> </div> <div class="col-lg-9"> <div class="collapse navbar-collapse" id="js-navbar-collapse"> <ul class="nav navbar-nav"> <li class="tab-link" ng-show="userdata"> <div class="nav-element"> Radius&nbsp;&nbsp; <input id="ex1" ng-model="radius" data-slider-id="ex1Slider" type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="50"> </div> </li> <li class="active tab-link" ng-show="userdata"> <div class="form-group nav-element"> <i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp; <input type="text" ng-model="searchCity" id="searchCity" placeholder="Type place name & Enter" ng-enter="search(searchCity)"> </div> </li> <li class="tab-link show-in-phone" ng-show="userdata"> <div class="nav-element"> <a class="btn btn-primary" ng-click="search(searchCity)">Search</a> </div> </li> </ul> <ul class="nav navbar-nav navbar-right"> <li ng-show="showSignIn"> <div class="nav-element"> <a id="btn-sign-in" class="btn btn-primary">Sign-in with Twitter</a> </div> </li> <li ng-show="showUser" class="nav-user" ng-hide="userdata"> <div class="nav-element"> {{userdata.name}} </div> </li> <li ng-show="showUser" class="nav-user"> <img id="user-profile" class="img img-responsive" src="{{userdata.picture}}" alt="{{userdata.name}}" title="{{userdata.name}}"> </li> </ul> </div> </div> </div> </div>'),a.put("views/partials/marker.html",'<div ng-controller="templateController"> {{parameter.text}}<br> <span class="pull-right">-&nbsp;{{parameter.name}}</span> </div>')}]);