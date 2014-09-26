(function(){"use strict";angular.module("frontendApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){return a.when("/",{templateUrl:"views/home.html",controller:"MainCtrl"}).when("/browse",{templateUrl:"views/browse.html",controller:"BrowseCtrl"}).when("/myballot/:raceLevel?",{templateUrl:"views/myballot.html",controller:"MyBallotCtrl"}).when("/search",{templateUrl:"views/search.html",controller:"SearchCtrl"}).when("/results/:searchType?/:searchTerm?",{templateUrl:"views/results.html",controller:"ResultsCtrl"}).when("/campaign/:campaignId",{templateUrl:"views/campaign.html",controller:"CampaignCtrl"}).when("/spend/:campaignId/:contributorId?",{templateUrl:"views/spend.html",controller:"SpendCtrl"}).when("/where/:campaignId/:raceLevel?",{templateUrl:"views/where.html",controller:"WhereCtrl"}).when("/worth/:campaignId/:contributorId?",{templateUrl:"views/worth.html",controller:"WorthCtrl"}).when("/calculate",{templateUrl:"views/calculate.html",controller:"CalculateCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/sandbox",{templateUrl:"views/sandbox.html",controller:"SandboxCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}).when("/hack_pac",{templateUrl:"views/hack_pac.html",controller:"HackPacCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).otherwise({redirectTo:"/"})}])}).call(this),angular.module("frontendApp").controller("NavCtrl",["$scope","$location",function(a,b){a.atHome=function(){return"/"===b.path()}}]),function(){"use strict";angular.module("frontendApp").controller("MainCtrl",["$scope","$location","SessionService",function(){}])}.call(this),function(){"use strict";angular.module("frontendApp").controller("BrowseCtrl",["$scope","$location","SessionService","AddressService","BALLOT",function(a,b,c,d,e){a.BALLOT=e,a.viewModel={searchArea:e.FULLADDRESS,hasAttempted:!1,address:{streetAddress:c.address.streetAddress,city:c.address.city,zip:c.address.zip}},a.selectArea=function(b){a.viewModel.searchArea=b},a.isLocal=function(){return a.viewModel.searchArea===e.FULLADDRESS},a.isZip=function(){return a.viewModel.searchArea===e.ZIP},a.isCounty=function(){return a.viewModel.searchArea===e.COUNTY},a.go=function(a){return b.path(a)},a.setMyBallot=function(){a.viewModel.hasAttempted=!0,a.query.$valid&&(c.update(a.viewModel.address),go("/myballot"))}}]).constant("BALLOT",{FULLADDRESS:"Local",ZIP:"Zipcode",COUNTY:"County"})}(),function(){"use strict";angular.module("frontendApp").controller("MyBallotCtrl",["$scope","$location","$routeParams","SessionService","AddressService","DISTRICTS",function(a,b,c,d,e,f){a.raceLevels=f,a.viewModel={races:[],raceLevel:c.raceLevel||a.raceLevels.CITY},a.viewing=function(b){return b===a.viewModel.raceLevel},a.selectLevel=function(b){a.viewModel.raceLevel=b,a.go("/myballot/"+b)},a.go=function(a){return b.path(a)}}])}(),function(){"use strict";angular.module("frontendApp").controller("SearchCtrl",["$scope","$location","SEARCH_TYPE",function(a,b,c){a.SEARCH_TYPE=c,a.viewModel={candidateSearchTerm:"",partySearchTerm:""},a.onCandidateSearch=function(){b.path("/results/"+c.CANDIDATE+"/"+a.viewModel.candidateSearchTerm)},a.onPartySearch=function(){}}]).constant("SEARCH_TYPE",{CANDIDATE:"candidate",PARTY:"party",ADDRESS:"address"})}(),function(){"use strict";angular.module("frontendApp").controller("ResultsCtrl",["$scope","$routeParams","CampaignService","SEARCH_TYPE",function(a,b,c){a.viewModel={searchType:b.searchType,searchTerm:b.searchTerm,campaigns:[]},a.$watchCollection("[viewModel.searchType, viewModel.searchTerm]",_.debounce(function(){c.searchCampaigns(a.viewModel.searchTerm).then(function(b){a.viewModel.campaigns=b})},250))}])}(),function(){"use strict";angular.module("frontendApp").controller("CampaignCtrl",["$scope","$routeParams","CampaignService","$http",function(a,b,c){a.campaignId=b.campaignId;new Date(2010,1,1).getTime(),new Date(2014,9,1).getTime();a.viewModel={section:"who",campaign:[],financialSummary:null,moneyByState:null},c.getCampaign(b.campaignId).then(function(d){a.viewModel.campaign=d,c.getCampaignFinancialSummary(a.viewModel.campaign.filer_id).then(function(b){a.viewModel.financialSummary=b}),c.getCampaignMoneyByState(b.campaignId).then(function(b){a.viewModel.moneyByState=b})});_(function(){new Date(parseInt(a.viewModel.startDate)),new Date(parseInt(a.viewModel.endDate))}).throttle(500)}])}.call(this),function(){"use strict";angular.module("frontendApp").controller("AboutCtrl",["$scope",function(){}])}.call(this),function(){"use strict";angular.module("frontendApp").controller("SandboxCtrl",["$scope",function(){}])}.call(this),function(){"use strict";angular.module("frontendApp").controller("RegisterCtrl",["$scope",function(){}])}.call(this),function(){"use strict";angular.module("frontendApp").controller("HackPacCtrl",["$scope",function(){}])}.call(this),function(){"use strict";angular.module("frontendApp").controller("ContactCtrl",["$scope",function(){}])}.call(this),function(){"use strict";angular.module("frontendApp").directive("searchBox",function(){return{restrict:"EA",templateUrl:"/views/directives/searchBox.html",scope:{searchTerm:"@",searchType:"@",prompt:"@"},controller:["$scope","$location",function(a,b){a.onSubmit=function(){b.path("/results/"+a.searchType+"/"+a.searchTerm)}}]}})}.call(this),function(){"use strict";angular.module("frontendApp").directive("campaignTile",function(){return{restrict:"EA",templateUrl:"/views/directives/campaignTile.html",scope:{campaign:"="},controller:["$scope",function(){}]}}),angular.module("frontendApp").filter("convertCase",function(){return function(a){var b=a.toLowerCase();return b.replace(/(^| )(\w)/g,function(a){return a.toUpperCase()})}})}.call(this),function(){"use strict";angular.module("frontendApp").directive("simpleRadial",function(){return{restrict:"EA",templateUrl:"/views/directives/simpleRadial.html",scope:{percent:"=",title:"@",icon:"@"},controller:["$scope",function(a){a.viewModel={formattedPercent:""}}],link:function(a,b){b.addClass("radial");var c=50,d=d3.select(b.find(".radial")[0]).append("svg").attr("width","100").attr("height","100").append("g").attr("transform","translate("+c+","+c+")"),e=["#64BCBB","#D9D9D9"],f=d3.layout.pie().sort(null),g=d3.svg.arc().innerRadius(c-15).outerRadius(c-5),h=function(){a.percent&&(d.empty(),d.selectAll("path").data(f([a.percent,1-a.percent])).enter().append("path").attr("d",g).attr("fill",function(a,b){return e[b%e.length]}))};a.$watch("percent",function(){if(_(a.percent).isNumber()){var b=100*a.percent;a.viewModel.formattedPercent=Math.round(b)}else a.viewModel.formattedPercent="";h()})}}})}.call(this),function(){"use strict";angular.module("frontendApp").directive("whoChart",function(){return{restrict:"EA",templateUrl:"/views/directives/whoChart.html",scope:{financialSummary:"="},controller:["$scope",function(){}]}})}.call(this),function(){"use strict";angular.module("frontendApp").directive("moneyByState",function(){return{restrict:"EA",templateUrl:"/views/directives/moneyByState.html",scope:{money:"="},controller:["$scope",function(){}],link:function(a,b){var c=960,d=600,e=d3.select(b[0]).append("svg").attr("width",c).attr("height",d),f=d3.geo.path(),g=d3.scale.linear().domain([100,1e3,1e4,1e5,1e6,1e7]).range(["rgb(204,236,230)","rgb(153,216,201)","rgb(102,194,164)","rgb(65,174,118)","rgb(35,139,69)","rgb(0,109,44)"]),h=null;d3.json("/data/us-states.json",function(a){h=a,i()}),a.$watch("money",function(){i()});var i=function(){if(a.money&&h){e.empty();for(var b=0;b<a.money.length;b++)for(var c=a.money[b].state,d=parseFloat(a.money[b].value),i=0;i<h.features.length;i++){var j=h.features[i].properties.name;if(c==j){h.features[i].properties.value=d;break}}e.selectAll("path").data(h.features).enter().append("path").attr("d",f).style("fill",function(a){var b=a.properties.value;return b?g(b):"#ccc"})}}}}})}.call(this),function(){"use strict";angular.module("frontendApp").directive("whereDir",function(){return{restrict:"EA",scope:{},link:function(a,b){var c,e,f,h,i,j,k,l;j=function(a,b){var c;return c=k.append("g").attr("class","counties").selectAll("path").data(topojson.feature(b,b.objects.counties).features).enter().append("path").attr("style",function(a){return"opacity: "+6*h.get(a.id)+";"}).attr("d",e)},l=300,c=300,h=d3.map(),i=d3.map(),f=d3.scale.quantize().domain([0,.15]).range(d3.range(9).map(function(a){return"q"+a+"-9"})),e=d3.geo.path(),k=d3.select(b[0]).append("svg").attr("width",l).attr("height",c),queue().defer(d3.json,"/data/where-map.json").defer(d3.tsv,"/data/where-before.tsv",function(a){return h.set(a.id,+a.rate)}).defer(d3.tsv,"/data/where-after.tsv",function(a){return i.set(a.id,+a.rate)}).await(j),window.redraw=function(a){var b,c;g.attr("style",function(){}),b=6*h.get(d.id),c=6*i.get(d.id)}}}})}.call(this),function(){"use strict";angular.module("frontendApp").directive("whereState",function(){return{restrict:"EA",link:function(){var a,b,c,d,e,f,g,h,i,j,k;return g=d3.range(1e3).map(d3.random.bates(10)),c=d3.format(",.0f"),e={top:10,right:30,bottom:30,left:30},h=960-e.left-e.right,d=500-e.top-e.bottom,i=d3.scale.linear().domain([0,1]).range([0,h]),b=d3.layout.histogram().bins(i.ticks(20))(g),k=d3.scale.linear().domain([0,d3.max(b,function(a){return a.y})]).range([d,0]),j=d3.svg.axis().scale(i).orient("bottom"),f=d3.select("#main-viz").append("svg").attr("width",h+e.left+e.right).attr("height",d+e.top+e.bottom).append("g").attr("transform","translate("+e.left+","+e.top+")"),a=f.selectAll(".bar").data(b).enter().append("g").attr("class","bar").attr("transform",function(a){return"translate("+i(a.x)+","+k(a.y)+")"}),a.append("rect").attr("x",1).attr("width",i(b[0].dx)-1).attr("height",function(a){return d-k(a.y)}),a.append("text").attr("dy",".75em").attr("y",6).attr("x",i(b[0].dx)/2).attr("text-anchor","middle").text(function(a){return c(a.y)}),f.append("g").attr("class","x axis").attr("transform","translate(0,"+d+")").call(j)}}})}.call(this),function(){"use strict";angular.module("frontendApp").directive("campaignSankey",["CampaignService",function(a){return{restrict:"EA",link:function(b,c){var d={top:1,right:1,bottom:6,left:1},e=960-d.left-d.right,f=1500-d.top-d.bottom,g=d3.format(",.0f"),h=function(a){return g(a)+" TWh"},i=(d3.scale.category20(),d3.select(c[0]).append("svg").attr("width",e+d.left+d.right).attr("height",f+d.top+d.bottom).append("g").attr("transform","translate("+d.left+","+d.top+")")),j=d3.sankey().nodeWidth(15).nodePadding(10).size([e,500]),k=j.link();a.getCampaignFinances().then(function(a){var b={nodes:[],links:[]},c={name:""};b.nodes.push(c);var d=0;_(a.contributions).each(function(a,c){d++,b.nodes.push({name:c}),b.links.push({source:d,target:0,value:a.amount})}),_(a.expenditures).each(function(a,c){d++,b.nodes.push({name:c}),b.links.push({source:0,target:d,value:a})}),j.nodes(b.nodes).links(b.links).layout(32);var f=i.append("g").selectAll(".link").data(b.links).enter().append("path").attr("class","link").attr("d",k).style("stroke-width",function(a){return Math.max(1,a.dy)}).sort(function(a,b){return b.dy-a.dy});f.append("title").text(function(a){return a.source.name+" → "+a.target.name+"\n"+h(a.value)});var g=i.append("g").selectAll(".node").data(b.nodes).enter().append("g").attr("class","node").attr("transform",function(a){return"translate("+a.x+","+a.y+")"});g.append("rect").attr("height",function(a){return a.dy}).attr("transform",function(){return null}).attr("class","node").attr("width",function(){return j.nodeWidth()}),g.append("text").attr("x",-6).attr("y",function(a){return a.dy/2}).attr("dy",".35em").attr("text-anchor","end").attr("transform",null).text(function(a){return a.name?a.name+" ($"+a.value+")":""}).filter(function(a){return a.x<e/2}).attr("x",6+j.nodeWidth()).attr("text-anchor","start")})}}}])}.call(this),function(){"use strict";angular.module("frontendApp").directive("bubbleChart",function(){return{restrict:"EA",scope:{donations:"=",colorMap:"="},link:function(a,b){a.$watch("donations",function(){a.donations&&!_(a.donations).isEmpty()&&c()});var c=function(){b.empty();var c=800,d=600,e=function(b){return a.colorMap[b.category]},f=d3.layout.pack().sort(null).size([c,d]).padding(1.5),g=d3.select(b[0]).append("div").attr("class","legend");g.selectAll(".category").data(_(a.colorMap).keys()).enter().append("div").attr("class","category").attr("style",function(b){var c=a.colorMap[b];return"background-color:"+c}).text(function(a){return a});var h=d3.select(b[0]).append("svg").attr("width",c).attr("height",d).attr("class","bubble"),i=h.selectAll(".node").data(f.nodes(a.donations).filter(function(a){return a.depth>0})).enter().append("g").attr("class","node").attr("transform",function(a){return"translate("+a.x+","+a.y+")"});i.append("title").text(function(a){return a.category+": "+a.value}),i.append("circle").attr("r",function(a){return a.r}).style("fill",e),i.append("text").attr("dy",".3em").style("text-anchor","middle").text(function(a){return a.category})}}}})}.call(this),function(){"use strict";angular.module("frontendApp").constant("BASE_URL","http://54.213.83.132/hackoregon/http/").factory("urls",["BASE_URL",function(a){{var b=_.template(a+"candidate_search/<%= searchTerm %>/"),c=_.template(a+"current_transactions/<%= campaignId %>/"),d=_.template(a+"candidate_search/<%= campaignId %>/"),e=_.template(a+"candidate_in_by_state/<%= campaignId %>/");_.template(a+"competitors_from_name/<%= campaignId %>/")}return{campaignSearch:function(a){return b({searchTerm:a})},transactions:function(a){return c({campaignId:a})},campaignDetail:function(a){return d({campaignId:a})},campaignMoneyByState:function(a){return e({campaignId:a})}}}])}(),function(){"use strict";angular.module("frontendApp").service("SessionService",function(){return this.address={streetAddress:"",city:"",zip:""},this.addAddress=function(a){this.address=_.clone(a)},this})}.call(this),function(){"use strict";angular.module("frontendApp").service("CampaignService",["$q","$http","urls",function(a,b,c){this.CONTRIBUTION={PAC:"PAC",BUSINESS:"Business",GRASSROOTS:"Grassroots",INDIVIDUAL:"Individual",PARTY:"Party",NA:"NA"};var d={campaignId:null,transactions:null};return this.searchCampaigns=function(d){var e=a.defer(),f=e.promise;return b.get(c.campaignSearch(d)).then(function(a){e.resolve(a.data)}),f},this.getCampaign=function(d){var e=a.defer(),f=e.promise;return b.get(c.campaignDetail(d)).then(function(a){e.resolve(a.data[0])}),f},this.getCampaignMoneyByState=function(d){var e=a.defer(),f=e.promise;return b.get(c.campaignMoneyByState(d)).then(function(a){e.resolve(a.data)}),f},this.getTransactions=function(e){var f=a.defer(),g=f.promise;return e===d.campaignId?f.resolve(_cachedTransaction.transactions):b.get(c.transactions(e)).then(function(a){d={campaignId:e,transactions:a.data},f.resolve(a.data)}),g},this.getCampaignFinancialSummary=function(b){var c=a.defer(),d=c.promise,e=this;return this.getTransactions(b).then(function(a){var b={};_(e.CONTRIBUTION).each(function(a){b[a]={amount:0,number:0}});var d={};_(a).chain().each(function(a){var c=a.sub_type;switch(c){case"Cash Contribution":var f=a.book_type,g="";switch(f){case"Business Entity":g=e.CONTRIBUTION.BUSINESS;break;case"Political Committee":g=e.CONTRIBUTION.PAC;break;case"Political Party Committee":g=e.CONTRIBUTION.PARTY;break;case"NA":g=e.CONTRIBUTION.NA;break;case"Individual":g=Number(a.amount)<=200?e.CONTRIBUTION.GRASSROOTS:e.CONTRIBUTION.INDIVIDUAL}g&&(b[g].amount+=Number(a.amount),b[g].number+=1);break;case"Cash Expenditure":var h=(a.purpose_codes||"").split("; ");_(h).each(function(b){_(d).has(b)||(d[b]=0),d[b]+=Number(a.amount)})}}),c.resolve({contributions:b,expenditures:d})}),d},this}])}.call(this),function(){"use strict";angular.module("frontendApp").service("AddressService",["$q",function(a){var b=["Water District","City","Public Utility","School","Library","Park Board","County","Election","City Council"],c=["Seat #2","Seat #5","Chairman","Secretary","Treasurer","Superintendent","Chief","Member"],d=function(){var a=b[Math.floor(Math.random()*b.length)],d=c[Math.floor(Math.random()*c.length)];return a+" "+d},e=new Chance;return this.getRacesByAddress=function(){var b,c;return b=a.defer(),c={local:[{name:d(),description:"What do they do?",campaigns:[{id:_.uniqueId(),name:e.name(),party:"Independent",total:e.integer({min:3e3,max:13e3}),grassroots:Math.random(),local:Math.random()},{id:_.uniqueId(),name:e.name(),party:"Independent",total:e.integer({min:3e3,max:13e3}),grassroots:Math.random(),local:Math.random()},{id:_.uniqueId(),name:e.name(),party:"Independent",total:e.integer({min:3e3,max:13e3}),grassroots:Math.random(),local:Math.random()},{id:_.uniqueId(),name:e.name(),party:"Independent",total:e.integer({min:3e3,max:13e3}),grassroots:Math.random(),local:Math.random()},{id:_.uniqueId(),name:e.name(),party:"Independent",total:e.integer({min:3e3,max:13e3}),grassroots:Math.random(),local:Math.random()}]},{name:d(),description:"What do they do?",campaigns:[{id:_.uniqueId(),name:e.name(),party:"Independent",total:e.integer({min:3e3,max:13e3}),grassroots:Math.random(),local:Math.random()},{id:_.uniqueId(),name:e.name(),party:"Independent",total:e.integer({min:3e3,max:13e3}),grassroots:Math.random(),local:Math.random()},{id:_.uniqueId(),name:e.name(),party:"Independent",total:e.integer({min:3e3,max:13e3}),grassroots:Math.random(),local:Math.random()}]},{name:d(),description:"What do they do?",campaigns:[{id:_.uniqueId(),name:e.name(),party:"Independent",total:e.integer({min:3e3,max:13e3}),grassroots:Math.random(),local:Math.random()},{id:_.uniqueId(),name:e.name(),party:"Independent",total:e.integer({min:3e3,max:13e3}),grassroots:Math.random(),local:Math.random()},{id:_.uniqueId(),name:e.name(),party:"Independent",total:e.integer({min:3e3,max:13e3}),grassroots:Math.random(),local:Math.random()}]}]},b.resolve(c.local),b.promise},this}]).constant({DISTRICTS:{LOCAL:"local",STATE:"state",CITY:"city",NATIONAL:"national",COUNTY:"county"}})}.call(this);