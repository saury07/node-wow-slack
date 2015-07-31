# About
This project should provide utilities for World of Warcraft guilds, such as a loot recap on a web interface and notifications on Slack channels for every new loot.
# Getting started
* Rename `parameters.js.dist`to `parameters.js`
* Insert your Slack incoming hook url and your [BNet apikey](https://dev.battle.net/) into `parameters.js`
* Install dependencies using `npm install`
* Run app.js : `node app.js`

Web interface is located on http://127.0.0.1:8085/front.html.
Making a call on http://127.0.0.1:8085 will bootstrap your local database with your guild info.

Beware that if a Slack hook has been provided, it will post every loot retrieved by Blizzard API, overloading your hook for a few minutes.

To get a near real time loot publish, simply cron that http call.