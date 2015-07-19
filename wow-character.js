var parameters = require('./parameters.js');
var request = require('request');

var WoWCharacter = function(){};

WoWCharacter.prototype.baseInfo = function(charname, callback){
	p = parameters.WoW;
	url = p.baseUrl + '/character/'+ p.realm+'/'+charname+'?locale='+ p.locale+'&apikey'+p.apikey;
	request(url, function(error, response, data){
		if(!error){
			var parsed = JSON.parse(data);
			callback(parsed);
		}
	});
};

WoWCharacter.prototype.portrait = function(portraiturl){
	return "http://eu.battle.net/static-render/eu/"+portraiturl;
};

module.exports = new WoWCharacter();