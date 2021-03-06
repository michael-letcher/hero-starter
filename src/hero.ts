/* eslint no-unused-vars: 0 */
/*

Strategies for the hero are contained within the "moves" object as
name-value pairs, like so:

    //...
    ambusher :(gamedData, helpers)=> {
      // implementation of strategy.
    },
    heWhoLivesToFightAnotherDay:(gamedData, helpers)=> {
      // implementation of strategy.
    },
    //...other strategy definitions.

The "moves" object only contains the data, but in order for a specific
strategy to be implemented we MUST set the "move" variable to a
definite property.  This is done like so:

move = moves.heWhoLivesToFightAnotherDay;

You MUST also export the move, in order for your code to ru=> n
So, at the bottom of this code, keep the line that says:

module.exports = move;

The "move" must return "North", "South", "East", "West", or "Stay=> "
(Anything else will be interpreted by the game as "Stay")

The "move" should accept two arguments that the website will be passing in=> :
- a "gameData" object which holds all information about the current state
  of the battle
- a "helpers" object, which contains useful helper functions
- check out the helpers.js file to see what is available to you

*/

// Strategy definitions
let moves = {
    // Aggressor
    aggressor: (gameData, helpers) => {
        // Here, we ask if your hero's health is below 30
        if (gameData.activeHero.health <= 30) {
            // If it is, head towards the nearest health well
            return helpers.findNearestHealthWell(gameData);
        } else {
            // Otherwise, go attack someone...anyone.
            return helpers.findNearestEnemy(gameData);
        }
    },

    // Health Nut
    healthNut: (gameData, helpers) => {
        // Here, we ask if your hero's health is below 75
        if (gameData.activeHero.health <= 75) {
            // If it is, head towards the nearest health well
            return helpers.findNearestHealthWell(gameData);
        } else {
            // Otherwise, go mine some diamonds!!!
            return helpers.findNearestNonTeamDiamondMine(gameData);
        }
    },

    // Balanced
    balanced: (gameData, helpers) => {
        // Here we determine if it's an even or odd turn for your hero;
        if ((gameData.turn / 2) % 2) {
            // If it is even, act like an an Aggressor
            return moves.aggressor(gameData, helpers);
        } else {
            // If it is odd, act like a Priest
            return moves.priest(gameData, helpers);
        }
    },

    // The "Northerner"
    // This hero will walk North.  Always.
    northener: (gameData, helpers) => {
        return 'North';
    },

    // The "Blind Man"
    // This hero will walk in a random direction each turn.
    blindMan: (gameData, helpers) => {
        const choices = ['North', 'South', 'East', 'West'];
        return choices[Math.floor(Math.random() * 4)];
    },

    // The "Priest"
    // This hero will heal nearby friendly champions.
    priest: (gameData, helpers) => {
        const myHero = gameData.activeHero;
        if (myHero.health < 60) {
            return helpers.findNearestHealthWell(gameData);
        } else {
            return helpers.findNearestTeamMember(gameData);
        }
    },

    // The "Unwise Assassin"
    // This hero will attempt to kill the closest enemy hero. No matter what.
    unwiseAssassin: (gameData, helpers) => {
        const myHero = gameData.activeHero;
        if (myHero.health < 30) {
            return helpers.findNearestHealthWell(gameData);
        } else {
            return helpers.findNearestEnemy(gameData);
        }
    },

    // The "Careful Assassin"
    // This hero will attempt to kill the closest weaker enemy hero.
    carefulAssassin: (gameData, helpers) => {
        const myHero = gameData.activeHero;
        if (myHero.health < 50) {
            return helpers.findNearestHealthWell(gameData);
        } else {
            return helpers.findNearestWeakerEnemy(gameData);
        }
    },

    // The "Safe Diamond Miner"
    // This hero will attempt to capture enemy diamond mines.
    safeDiamondMiner: (gameData, helpers) => {
        const myHero = gameData.activeHero;

        // Get stats on the nearest health well
        const healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, (boardTile) => {
            if (boardTile.type === 'HealthWell') {
                return true;
            }
        });
        const distanceToHealthWell = healthWellStats.distance;
        const directionToHealthWell = healthWellStats.direction;

        if (myHero.health < 40) {
            // Heal no matter what if low health
            return directionToHealthWell;
        } else if (myHero.health < 100 && distanceToHealthWell === 1) {
            // Heal if you aren't full health and are close to a health well already
            return directionToHealthWell;
        } else {
            // If healthy, go capture a diamond mine!
            return helpers.findNearestNonTeamDiamondMine(gameData);
        }
    },

    // The "Selfish Diamond Miner"
    // This hero will attempt to capture diamond mines (even those owned by teammates).
    selfishDiamondMiner: (gameData, helpers) => {
        const myHero = gameData.activeHero;

        // Get stats on the nearest health well
        const healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, (boardTile) => {
            if (boardTile.type === 'HealthWell') {
                return true;
            }
        });

        const distanceToHealthWell = healthWellStats.distance;
        const directionToHealthWell = healthWellStats.direction;

        if (myHero.health < 40) {
            // Heal no matter what if low health
            return directionToHealthWell;
        } else if (myHero.health < 100 && distanceToHealthWell === 1) {
            // Heal if you aren't full health and are close to a health well already
            return directionToHealthWell;
        } else {
            // If healthy, go capture a diamond mine!
            return helpers.findNearestUnownedDiamondMine(gameData);
        }
    },

    // The "Coward"
    // This hero will try really hard not to die.
    coward: (gameData, helpers) => {
        return helpers.findNearestHealthWell(gameData);
    },

    rational: (gameData, helpers) => {
        // Collect data
        const myHero = gameData.activeHero;
        const diamondMine;
        diamondMine.enemy = helpers.findNearestNonTeamDiamondMine(gameData);
        diamondMine.unowned = helpers.findNearestUnownedDiamondMine(gameData);

        // Arrange data
        const playerZones = {
            1: {},
            2: {},
            3: {},
        };

        // Run data against logic
        // @todo move to logic file
        if (myHero.health > 70) {

        }

    }
};

// Set our hero's strategy
const move = moves.aggressor;

// Export the move function
module.exports = move;
