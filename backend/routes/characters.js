var express = require('express');
var router = express.Router();
var neCache = require('../services/ne-cache.js');
var WoW = require('../services/wow.js');
var _ = require('lodash');

router.get('/update', function(req, res, next){
    WoW.guildMembers(function(data) {
        var characters = data.members;
        console.log(characters.length + ' characters found');

        _.each(characters, function(character) {
            neCache.findCharacters(character, function(docs) {
                if(docs.length == 0) {
                    neCache.saveCharacter(character);
                } else {
                    var dbCharacter = docs[0];
                    if(dbCharacter.rank != character.rank) {
                        neCache.updateCharacter(dbCharacter, character);
                    }
                }
            });
        });
    });
});

module.exports = router;