var express = require('express');
var router = express.Router();
var neCache = require('../services/mongo-cache.js');
var WoW = require('../services/wow.js');
var _ = require('lodash');


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

router.get('/guild/lootsOfTheDay', function(req, res) {
    neCache.findNewsOfTheDay(function(docs) {
        if(docs && docs.length > 0){
            var prettyDocs = [];
            var finished = _.after(docs.length, function(){
                prettyDocs =_.sortByOrder(prettyDocs,['timestamp', 'character'], ['asc', 'asc']);
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
        WoW.itemInfos(item, item.context, true, function(itemData, sure){
            var wowheadLink = 'http://fr.wowhead.com/item='+item.itemId;
            if(item.bonusLists && item.bonusLists.length > 0) {
                wowheadLink += "&bonus=";
                _.each(item.bonusLists, function (bonus, index) {
                    wowheadLink += (index == 0) ? bonus : ":" + bonus;
                });
            }
            callback({
                name:itemData.name,
                id:item.itemId,
                character: item.character,
                ilvl:itemData.itemLevel,
                quality: itemData.quality,
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