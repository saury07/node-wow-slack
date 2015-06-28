var _ = require('lodash');
var WoWCaracs = require('../wow-caracs.js');

var WoWItem = function(){};

WoWItem.prototype.PrimariesCaracs = function(itemData){
	var caracIdsExtracted = WoWCaracs.Primaries(itemData.bonusStats);
	if(caracIdsExtracted && caracIdsExtracted.length > 0){
		var ret = [];
		_.forEach(caracIdsExtracted,function(stat){
			var name = WoWCaracs.Name(stat.stat);
			if(name){
				ret.push({
					name: name,
					value: stat.amount
				});
			}
		});
		return ret;
	}
};

WoWItem.prototype.SecondariesCaracs = function(itemData){
	var caracIdsExtracted = WoWCaracs.Secondaries(itemData.bonusStats);
	if(caracIdsExtracted && caracIdsExtracted.length > 0){
		var ret = [];
		_.forEach(caracIdsExtracted,function(stat){
			var name = WoWCaracs.Name(stat.stat);
			if(name){
				ret.push({
					name: name,
					value: stat.amount
				});
			}
		});
		return ret;
	}
};

WoWItem.prototype.toString = function(caracs){
	var v = "";
	_.forEach(caracs, function(carac){
		v += carac.name+' : '+carac.value+'\n';
	});
	return v;
};

module.exports = new WoWItem();