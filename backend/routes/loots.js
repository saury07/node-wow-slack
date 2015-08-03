var express = require('express');
var router = express.Router();
var neCache = require('../services/ne-cache.js');
var WoW = require('../services/wow.js');
var _ = require('lodash');

router.get('/', function(req, res, next){
    neCache.listCharacters(function(characters){
        res.send({characters: characters});
    });
});

router.get('/:character', function(req,res,next){
    neCache.findForCharacter(req.params.character, function(docs){
        if(docs && docs.length > 0){
            var prettyDocs = [];
            var finished = _.after(docs.length, function(){
                prettyDocs =_.sortByOrder(prettyDocs,'timestamp', 'desc');
                res.send({data: prettyDocs});
            });
            _.forEach(docs, function(doc){
                buildItemDetails(doc,function(itemDetail){
                    if(itemDetail !== null){
                        prettyDocs.push(itemDetail);
                    }
                    finished();
                });
            });

        }
        else{
            res.send({data:{}})
        }
    });
});

var buildItemDetails = function(item, callback){
    if(item.type === 'itemLoot'){
        WoW.itemInfos(item.itemId, item.context, true, function(itemData, sure){
            var wowheadLink = 'http://fr.wowhead.com/item='+item.itemId;
            if(item.bonusLists.length > 0) {
                wowheadLink += "&bonus=";
                _.each(item.bonusLists, function (bonus, index) {
                    wowheadLink += (index == 0) ? bonus : ":" + bonus;
                });
            }
            callback({
                name:itemData.name,
                id:item.itemId,
                ilvl:itemData.itemLevel,
                wowheadLink: wowheadLink,
                sure: sure,
                timestamp: item.timestamp,
                icon: WoW.itemIconUrl(itemData.icon)
            });
        });
    }
    else{
        callback(null);
    }
};

module.exports = router;