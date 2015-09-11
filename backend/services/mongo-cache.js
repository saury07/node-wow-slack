var Datastore = require('mongodb').MongoClient;
var _ = require('lodash');
var Parameters = require('../../parameters.js');

var neCache = function () {};


neCache.prototype.findNews = function (item, callback) {
	getDb('news', function(db){
		db.find({character: item.character, timestamp: item.timestamp, itemId: item.itemId}).toArray(function (err, docs) {
			if(err){
				console.log(err);
			}
			else {
				callback(docs);
			}
		});
	});
};

neCache.prototype.saveNews = function (item) {
	getDb('news', function(db){
		db.insert(item, function (err, docs) {
			if (err) {
				console.log(err);
			}
		});
	});
};

neCache.prototype.findForCharacter = function(character, callback){
	getDb('news', function(db){
		db.find({character:character},{'sort':[['timestamp', 'desc']]}).toArray(function(err, docs){
			if(err){
				console.log(err);
			}
			else{
				callback(docs);
			}
		});
	});
};

neCache.prototype.listCharacters = function(callback){
	getDb('news', function(db){
		db.distinct('character',function(err, docs){
			if(err){
				console.log(err);
			}
			else {
				callback(docs.sort());
			}
		});
	});
};

neCache.prototype.saveCharacter = function (character) {
	getDb('characters', function(db){
		db.insert(character, function (err, doc) {
			if (err) {
				console.log(err);
			}
		});
	});
};

neCache.prototype.dropCharacters = function() {
	getDb('characters', function(db){
		db.drop();
	});
};

neCache.prototype.getAllCharacters = function (callback) {
	getDb('characters',function(db){
		db.find({}).toArray(function (err, docs) {
			if (err) {
				console.log(err);
			}
			else {
				callback(docs);
			}
		});
	});
};

var currentDb;

var getDb = function(name, callback){
	if(!currentDb) {
		Datastore.connect(Parameters.DB.url, function (err, db) {
			if (err) {
				console.log(err);
			}
			else {
				currentDb = db;
				var collection = currentDb.collection(name);
				if (collection) {
					callback(collection);
				}
				else {
					console.log('Can\'t find collection' + name);
				}
			}
		});
	}
	else{
		var collection = currentDb.collection(name);
		if (collection) {
			callback(collection);
		}
		else{
			console.log('Collection '+name+' not found, clearing dbConnection.')
			currentDb.close();
			currentDb = null;
		}
	}
};

module.exports = new neCache();
