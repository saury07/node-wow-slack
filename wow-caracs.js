var _ = require('lodash');
var WoWCaracs = function(){};

WoWCaracs.prototype.caracteristics = [
	{
		"id": 0,
		"name": "Mana"
	},
	{
		"id": 1,
		"name": "Health"
	},
	{
		"id": 3,
		"name": "Agilité"
	},
	{
		"id": 4,
		"name": "Force"
	},
	{
		"id": 5,
		"name": "Intelligence"
	},
	{
		"id": 6,
		"name": "Esprit"
	},
	{
		"id": 7,
		"name": "Endurance"
	},
	{
		"id": 12,
		"name": "Defense"
	},
	{
		"id": 13,
		"name": "Dodge"
	},
	{
		"id": 14,
		"name": "Parry"
	},
	{
		"id": 15,
		"name": "Block"
	},
	{
		"id": 16,
		"name": "Hit (Melee)"
	},
	{
		"id": 17,
		"name": "Hit (Ranged)"
	},
	{
		"id": 18,
		"name": "Hit (Spell)"
	},
	{
		"id": 19,
		"name": "Critical Strike (Melee)"
	},
	{
		"id": 20,
		"name": "Critical Strike (Ranged)"
	},
	{
		"id": 21,
		"name": "Critical Strike (Spell)"
	},
	{
		"id": 22,
		"name": "Hit Avoidance (Melee)"
	},
	{
		"id": 23,
		"name": "Hit Avoidance (Ranged)"
	},
	{
		"id": 24,
		"name": "Hit Avoidance (Spell)"
	},
	{
		"id": 25,
		"name": "Critical Strike Avoidance (Melee)"
	},
	{
		"id": 26,
		"name": "Critical Strike Avoidance (Ranged)"
	},
	{
		"id": 27,
		"name": "Critical Strike Avoidance (Spell)"
	},
	{
		"id": 28,
		"name": "Haste (Melee)"
	},
	{
		"id": 29,
		"name": "Haste (Ranged)"
	},
	{
		"id": 30,
		"name": "Haste (Spell)"
	},
	{
		"id": 31,
		"name": "Hit"
	},
	{
		"id": 32,
		"name": "Critique"
	},
	{
		"id": 33,
		"name": "Hit Avoidance"
	},
	{
		"id": 34,
		"name": "Critical Strike Avoidance"
	},
	{
		"id": 35,
		"name": "PvP Resilience"
	},
	{
		"id": 36,
		"name": "Hâte"
	},
	{
		"id": 37,
		"name": "Expertise"
	},
	{
		"id": 38,
		"name": "Attack Power"
	},
	{
		"id": 39,
		"name": "Ranged Attack Power"
	},
	{
		"id": 40,
		"name": "Polyvalence"
	},
	{
		"id": 41,
		"name": "Bonus Healing"
	},
	{
		"id": 42,
		"name": "Bonus Damage"
	},
	{
		"id": 43,
		"name": "Mana Regeneration"
	},
	{
		"id": 44,
		"name": "Armor Penetration"
	},
	{
		"id": 45,
		"name": "Puissance des sorts"
	},
	{
		"id": 46,
		"name": "Health Per 5 Sec."
	},
	{
		"id": 47,
		"name": "Spell Penetration"
	},
	{
		"id": 48,
		"name": "Block Value"
	},
	{
		"id": 49,
		"name": "Maîtrise"
	},
	{
		"id": 50,
		"name": "Armure bonus"
	},
	{
		"id": 51,
		"name": "Fire Resistance"
	},
	{
		"id": 52,
		"name": "Frost Resistance"
	},
	{
		"id": 53,
		"name": "Holy Resistance"
	},
	{
		"id": 54,
		"name": "Shadow Resistance"
	},
	{
		"id": 55,
		"name": "Nature Resistance"
	},
	{
		"id": 56,
		"name": "Arcane Resistance"
	},
	{
		"id": 57,
		"name": "PvP Power"
	},
	{
		"id": 58,
		"name": "Amplify"
	},
	{
		"id": 59,
		"name": "Frappe multiple"
	},
	{
		"id": 60,
		"name": "Readiness"
	},
	{
		"id": 61,
		"name": "Vitesse"
	},
	{
		"id": 62,
		"name": "Ponction"
	},
	{
		"id": 63,
		"name": "Evitement"
	},
	{
		"id": 64,
		"name": "Indestructible"
	},
	{
		"id": 65,
		"name": "Unused 7"
	},
	{
		"id": 66,
		"name": "Cleave"
	},
	{
		"id": 67,
		"name": "Polyvalence"
	},
	{
		"id": 68,
		"name": "Unused 10"
	},
	{
		"id": 69,
		"name": "Unused 11"
	},
	{
		"id": 70,
		"name": "Unused 12"
	},
	{
		"id": 72,
		"name": "Force / Agilité"
	},
	{
		"id": 73,
		"name": "Intelligence / Agilité"
	},
	{
		"id":74,
		"name": "Force / Intelligence"
	}
];

WoWCaracs.prototype.Name = function(caracId){
	var found = _.find(this.caracteristics, function(item){
		return caracId === item.id;
	});
	if(found){
		return found.name;
	}
	return null;
};

WoWCaracs.prototype.ExtractIds = function(bonusStats){
	return _.map(bonusStats,function(item){
		return item.stat;
	});
};

WoWCaracs.prototype.Primaries = function(bonusStats){
	var inter = _.intersection(this.ExtractIds(bonusStats),[3,4,5,6,7]);
	return _.filter(bonusStats,function(stat){
		return _.contains(inter, stat.stat);
	});
};

WoWCaracs.prototype.Secondaries = function(bonusStats){
	var inter = _.intersection(this.ExtractIds(bonusStats),[32,36,40,45,49,50,59,67]);
	return _.filter(bonusStats,function(stat){
		return _.contains(inter, stat.stat);
	});
};

WoWCaracs.prototype.Tertiaries = function(bonusStats){
	var inter = _.intersection(this.ExtractIds(bonusStats),[61,62,63,64]);
	return _.filter(bonusStats,function(stat){
		return _.contains(inter, stat.stat);
	});
};

module.exports = new WoWCaracs();