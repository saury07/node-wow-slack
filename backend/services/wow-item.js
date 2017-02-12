var _ = require('lodash');
var WoWCaracs = require('./wow-caracs.js');
var WoWInventory = require('./wow-inventory.js');

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

WoWItem.prototype.getBonus = function(itemData){
    var caracIdsExtracted = WoWCaracs.Tertiaries(itemData.bonusStats);
    var ret = [];

    if(itemData.hasSockets) {
        ret.push({
            name: 'Châsse',
            value: ''
        });
	}

    if(caracIdsExtracted && caracIdsExtracted.length > 0){
        _.forEach(caracIdsExtracted,function(stat){
            var name = WoWCaracs.Name(stat.stat);
            if(name){
                ret.push({
                    name: name,
                    value: stat.amount
                });
            }
        });
    }

    return ret;
};

WoWItem.prototype.getEffect = function(itemData){
	if(itemData.itemSpells && itemData.itemSpells.length > 0) {
		var effect = '';
        _.forEach(itemData.itemSpells, function(itemSpell){
            var name = WoWInventory.triggers[itemSpell.trigger];
            var desc = itemSpell.spell.description;
            if(name && desc){
            	desc = desc.replace('^', '');
                effect += name+' : '+desc+'\n';
            }
        });
        return effect;
	}

};

WoWItem.prototype.toString = function(caracs){
	var v = "";
	_.forEach(caracs, function(carac){
		v += (carac.value == '') ? carac.name+'\n' : carac.name+' : '+carac.value+'\n';
	});
	return v;
};

module.exports = new WoWItem();