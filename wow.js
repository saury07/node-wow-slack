var parameters = require('./parameters.js');
var request = require('request');

var WoW = function() {};

WoW.prototype.guildInfos = function(callback){
	p = parameters.WoW;
	url =   p.baseUrl + '/guild/' +
			p.realm + '/' +
			encodeURIComponent(p.guild) + '?' +
			'fields=' + p.fields.join() + '&' +
			'locale=' + p.locale;
	request(url, function(error, response, data){
		if(!error){
			try {
				var parsed = JSON.parse(data);
				callback(parsed);
			}
			catch(err){
				console.log('Impossible to parse incoming data');
			}
		}
	});
};

WoW.prototype.itemInfos = function(itemId, callback){
	p = parameters.WoW;
	url = p.baseUrl + '/item/'+itemId+'?locale='+ p.locale+'&apikey'+p.apikey;
	request(url, function(error, response, data){
		if(!error){
			var parsed = JSON.parse(data);
			if(!parsed.itemLevel && parsed.availableContexts){
				WoW.prototype.itemInfos(itemId+'/'+parsed.availableContexts[0], callback);
			}
			else {
				callback(parsed);
			}
		}
	});
};

WoW.prototype.itemIconUrl = function(itemIconPath){
	return 'http://media.blizzard.com/wow/icons/56/'+itemIconPath+'.jpg'
};

WoW.prototype.itemColor = function(itemQuality){
	if(itemQuality==5){
		return '#ff8000';
	}
	if(itemQuality==4){
		return '#a335ee';
	}
	if(itemQuality==3){
		return '#0070dd';
	}
	if(itemQuality==2){
		return '#1eff00';
	}
	if(itemQuality==1){
		return '#ffffff'
	}
};

module.exports = new WoW();