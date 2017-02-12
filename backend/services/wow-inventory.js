var WoWInventory = function(){};

WoWInventory.prototype.inventoryTypes = {
		"0": "Aucun",
		"1": "Tête",
		"2": "Cou",
		"3": "Epaules",
		"4": "Chemise",
		"5": "Torse",
		"6": "Ceinture",
		"7": "Jambes",
		"8": "Pieds",
		"9": "Poignets",
		"10": "Gants",
		"11": "Anneau",
		"12": "Bijou",
		"13": "Main droite",
		"14": "Bouclier",
		"15": "Distance",
		"16": "Cape",
		"17": "Arme à deux mains",
		"18": "Sac",
		"19": "Tabard",
		"20": "Robe",
		"21": "Main droite",
		"22": "Main gauche",
		"23": "Tenu en main gauche",
		"24": "Munition",
		"25": "Arme de jet",
		"28": "Relique"
};

WoWInventory.prototype.relicTypes = {
    "ARCANE": "Arcane",
    "WATER": "Eau",
    "IRON": "Fer",
    "FIRE": "Feu",
    "FEL": "Gangrené",
    "FROST": "Givre",
    "SHADOW": "Ombre",
    "HOLY": "Sacré",
    "BLOOD": "Sang",
    "WIND": "Tempête",
    "LIFE": "Vie"
};

WoWInventory.prototype.triggers = {
	"ON_EQUIP": "Equipé",
	"ON_USE": "Utilise"
};

module.exports = new WoWInventory();