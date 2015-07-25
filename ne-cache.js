var Datastore = require('nedb');
var _ = require('lodash');

var dbNews = new Datastore({filename: 'news.db', autoload: true});
var neCache = function () {};


neCache.prototype.findNews = function (item, callback) {
	dbNews.find({character: item.character, timestamp: item.timestamp, itemId: item.itemId}, function (err, docs) {
		if(err){
			console.log(err);
		}
		else {
			callback(docs);
		}
	});
};

neCache.prototype.saveNews = function (item) {
	dbNews.insert(item, function (err, docs) {
		if (err) {
			console.log(err);
		}
	});
};

neCache.prototype.findForCharacter = function(character, callback){
	dbNews.find({character:character}).sort({timestamp:-1}).exec(function(err, docs){
		if(err){
			console.log(err);
		}
		else{
			callback(docs);
		}
	});
};

neCache.prototype.listCharacters = function(callback){
	dbNews.find().sort({character:1}).exec(function(err, docs){
		if(err){
			console.log(err);
		}
		else {
			callback(_.map(_.uniq(docs, function (doc) {
				return doc.character;
			}), function (doc) {
				return doc.character;
			}));
		}
	});
};

module.exports = new neCache();