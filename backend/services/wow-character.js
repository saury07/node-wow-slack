var _ = require('lodash');
var parameters = require('./../../parameters.js');
var request = require('request');

var WoWCharacter = function(){};

WoWCharacter.prototype.classesColors = [
	{ "id":1, "color":"#C79C6E" },	//Warrior
	{ "id":2, "color":"#F58CBA" },	//Paladin
	{ "id":3, "color":"#ABD473" },	//Hunter
	{ "id":4, "color":"#FFF569" },	//Rogue
	{ "id":5, "color":"#FFFFFF" },	//Priest
	{ "id":6, "color":"#C41F3B" },	//Death Knight
	{ "id":7, "color":"#0070DE" },	//Shaman
	{ "id":8, "color":"#69CCF0" },	//Mage
	{ "id":9, "color":"#9482C9" },	//Warlock
	{ "id":10, "color":"#00FF96" },	//Monk
	{ "id":11, "color":"#FF7D0A" }	//Druid
];

WoWCharacter.prototype.baseInfo = function(charname, callback){
	charname = encodeURI(charname);
	p = parameters.WoW;
	url = p.baseUrl + '/character/'+ p.realm+'/'+charname+'?locale='+ p.locale+'&apikey='+p.apikey;
	request(url, function(error, response, data){
		if(!error){
			var parsed = JSON.parse(data);
			callback(parsed);
		}
		else{
			console.log('Error getting ', url, ' ', error)
		}
	});
};

WoWCharacter.prototype.color = function(classId) {
	var found = _.find(this.classesColors, function(classColor){
		return classId === classColor.id;
	});
	return found ? found.color : null;
};

WoWCharacter.prototype.portrait = function(portraiturl){
	return "http://eu.battle.net/static-render/eu/"+portraiturl;
};

module.exports = new WoWCharacter();
