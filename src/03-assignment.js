function playerStat (playerName, statKey) {
    const game = gameObject();
    for (let teamKey in game) {
        let team = game[teamKey];
        let players = team.players;
        for (let playerKey in players) {
            let player = players[playerKey];
            let stat = statValue(player, playerKey, playerName, statKey);
            if (stat !== undefined) {
                return stat;
            }
        }
    }
}

function teamStat (teamName, statKey) {
    const game = gameObject();
    for (let teamKey in game) {
        let team = game[teamKey];
        if (team.teamName === teamName) {
            return team[statKey];
        }
    }
}

function teamColors(teamName) {
    return teamStat(teamName, "colors");
}

function teamNames() {
    const game = gameObject();
    const names = [];
    for (let teamKey in game) {
        const team = game[teamKey];
        names.push(team.teamName);
    }
    return names;
}

function numPointsScored(playerName) {
    return playerStat(playerName, "points");
}

function statValue(player, playerKey, playerName, statKey) {
    if (playerKey === playerName) {
        return player[statKey];
    }
}

function shoeSize(playerName) {
    return playerStat(playerName, "shoe");
}

function playerNumbers(teamName) {
    const players = teamStat(teamName, "players");
    let numbers = [];
    for (let playerKey in players) {
        const number = players[playerKey]["number"];
        numbers.push(number);
    }
    return numbers;
}

//TODO: refactor repeated code.
function playerStats(playerName) {
    const game = gameObject();
    for (let teamKey in game) {
        let team = game[teamKey];
        let players = team.players;
        for (let playerKey in players) {
            if (playerKey === playerName) {
                return players[playerKey];
            }
        }
    }
}

function bigShoeRebounds() {
    const game = gameObject();
    let maxShoeSizePlayer;
    let maxShoeSize = 0;
    for (let teamKey in game) {
        let team = game[teamKey];
        let players = team.players;
        for (let playerKey in players) {
            let player = players[playerKey];
            if (player.shoe > maxShoeSize) {
                maxShoeSize = player.shoe;
                maxShoeSizePlayer = player;
            }
        }
    }
    return maxShoeSizePlayer.rebounds;
}

const playerName = "Reggie Evans";
const playerPoints = numPointsScored(playerName);
const playerShoeSize = shoeSize(playerName);
const teamName = "Charlotte Hornets";
const colors = teamColors(teamName);
const numbers = playerNumbers(teamName);
const playerAllStats = playerStats(playerName);
const formattedPlayerStats = JSON.stringify(playerAllStats, null, 2);
const maxShoeRebounds = bigShoeRebounds();

console.log(`${playerName}'s stats:`);
console.log(`   - scored ${playerPoints} points.`);
console.log(`   - shoe size: ${playerShoeSize}`);
console.log(`   - all stats: ${formattedPlayerStats}`)
console.log(`${teamName}'s stats:`);
console.log(`   - colors: ${colors}`);
console.log(`   - jersey numbers: ${numbers}`);
console.log(`Teams in the game: ${teamNames()}`);
console.log(`Player with the largest shoe size recorded ${maxShoeRebounds} rebounds.`)