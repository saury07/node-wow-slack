var _ = require('lodash');
var parameters = require('./../../parameters.js');
var request = require('request');

var WoWGuild = function() {};

WoWGuild.prototype.ranks = [
    { "id":0, "rank":"Maître de guilde" },
    { "id":1, "rank":"Officier" },
    { "id":2, "rank":"Reroll officier" },
    { "id":3, "rank":"Roster" },
    { "id":4, "rank":"Reroll roster" },
    { "id":5, "rank":"Guest" },
    { "id":6, "rank":"Reroll guest" },
    { "id":7, "rank":"Apply" },
    { "id":8, "rank":"/TG" },
    { "id":9, "rank":"TODO" }
];

WoWGuild.prototype.members = function(callback){
    p = parameters.WoW;
    url =   p.baseUrl + 'guild/' + p.realm + '/' + encodeURIComponent(p.guild) + '?' + 'fields=members' + '&' + 'locale=' + p.locale + '&apikey=' +p.apikey;
    request(url, function(error, response, data){
        if(!error){
            try {
                var parsed = JSON.parse(data);
                callback(parsed);
            }
            catch(err){
                console.log('Impossible to parse incoming data', err);
            }
        }
    });
};

WoWGuild.prototype.rank = function(rankId) {
    var found = _.find(this.ranks, function(rank){
        return rankId === rank.id;
    });
    return found ? found.rank : null;
};

WoWGuild.prototype.isPartOfRoster = function(rankId) {
    return (rankId == 0 || rankId == 1 || rankId == 3 || rankId == 7);
};

module.exports = new WoWGuild();
