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
	getDb('new', function(db){
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
		db.save(character, {w:1}, function (err, doc) {
			if (err) {
				console.log(err);
			}
		});
	});
};

neCache.prototype.findCharacters = function (character, callback) {
	getDb('characters',function(db) {
		db.find({'character.name': character.character.name}).toArray(function (err, docs) {
			if (err) {
				console.log(err);
			}
			else {
				callback(docs);
			}
		});
	});
};

neCache.prototype.updateCharacter = function (oldCharacter, newCharacter) {
	getDb('characters',function(db){
		db.update({_id: oldCharacter._id}, newCharacter, function (err, docs) {
			if(err){
				console.log(err);
			}
		});
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

var getDb = function(name, callback){
	Datastore.connect(Parameters.DB.url, function(err, db) {
		if(err){
			console.log('----------------');
			console.log(err);
			console.log('----------------');
		}
		else {
			var collection = db.collection(name);
			if(collection){
				callback(collection);
			}
			else{
				console.log('Can\'t find collection' + name);
			}
		}
	});
};

module.exports = new neCache();
