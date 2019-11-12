let toggler = true;
let name1;
let name2;
let limbo = []; 

class CardGenerator {
    constructor(n,a,b,c,d,e,w) {
    this.name = n;
    this.attribute1 = a; 
    this.attribute2 = b;
    this.attribute3 = c;
    this.attribute4 = d;
    this.attribute5 = e;
    this.wins = w; // could have just set to 0...
    }
}

const clear = () => {
    let log = document.getElementById("description")
    log.textContent = " "
}

const seeCards = () => {
    if (toggler) {
        document.getElementById("description1").innerHTML = `[Your Card: ${player1[0].name}]<br> 
        Attack: ${player1[0].attribute1}<br> 
        Health: ${player1[0].attribute2}<br> 
        Defense: ${player1[0].attribute3}<br> 
        Speed: ${player1[0].attribute4}<br> 
        Weight: ${player1[0].attribute5}<br> 
        Amount Of Cards: ${player1.length}`
        document.getElementById("description2").innerHTML = `[Your Card: ???]<br> 
        Attack: ???<br> 
        Health: ???<br> 
        Defense: ???}<br> 
        Speed: ???<br> 
        Weight: ???<br> 
        Amount Of Cards: ${player2.length}`
    }
    else {
        document.getElementById("description2").innerHTML = `[Your Card: ${player1[0].name}]<br> 
        Attack: ${player1[0].attribute1}<br> 
        Health: ${player1[0].attribute2}<br> 
        Defense: ${player1[0].attribute3}<br> 
        Speed: ${player1[0].attribute4}<br> 
        Weight: ${player1[0].attribute5}<br> 
        Amount Of Cards: ${player1.length}`
        document.getElementById("description1").innerHTML = `[Your Card: ???]<br> 
        Attack: ???<br> 
        Health: ???<br> 
        Defense: ???}<br> 
        Speed: ???<br> 
        Weight: ???<br> 
        Amount Of Cards: ${player2.length}`
    }
}

// const toggle = () => {
//     if (!toggler){
//         // alert(`${name1} lost the round! It's now ${name2}'s turn`) // need to work out name changes
//         // tempName = name1;
//         // name1 = name2;
//         // name2 = tempName;
//         // temp = player1;
//         // player1 = player2;
//         // player2 = temp;
//         // toggler = true;
//     }  
//     else if (toggler){
//         console.log("Hi")
//     }
// }

const compare = (pla1Card, pla2Card) => {   
    if (pla1Card > pla2Card) { 
        document.getElementById("description").innerHTML +=`${name1}'s Card: ${player1[0].name} (${pla1Card})<br>`
        document.getElementById("description").innerHTML +=`${name2}'s Card: ${player2[0].name} (${pla2Card})<br>`
        document.getElementById("description").innerHTML +=`${name1} wins the round<br>`
        player1[0].wins ++;
        player1.push(player2[0]);
        player2.shift();
        let top = player1.shift();
        player1.push(top);
        document.getElementById("description").innerHTML +=`${player1[player1.length-1].name} wins: ${player1[player1.length-1].wins}<br>`
        document.getElementById("description").innerHTML +=`${name1} Cards left: ${player1.length}<br>`
        document.getElementById("description").innerHTML +=`${name2} Cards left: ${player2.length}<br>`
        document.getElementById("description").innerHTML +=`Middle Cards left: ${limbo.length}<br><hr>`
        if (limbo.length > 0) {
            limbo.forEach(card => {
                player1.push(card);
            });
            limbo = []; // Empties array, since these cards have now been recorded
        }
        toggler = true;
        // toggle()

    }
    else if (pla1Card < pla2Card) {
        document.getElementById("description").innerHTML +=`${name1}'s Card: ${player1[0].name} (${pla1Card})<br>`
        document.getElementById("description").innerHTML +=`${name2}'s Card: ${player2[0].name} (${pla2Card})<br>`
        document.getElementById("description").innerHTML +=`${name2} wins the round<br>`
        player2[0].wins ++;
        player2.push(player1[0]);
        player1.shift();
        let top = player2.shift();
        player2.push(top);
        document.getElementById("description").innerHTML +=`${player2[player2.length-1].name} wins: ${player2[player2.length-1].wins}<br>`
        document.getElementById("description").innerHTML +=`${name1} Cards left: ${player1.length}<br>`
        document.getElementById("description").innerHTML +=`${name2}  Cards left: ${player2.length}<br>`
        document.getElementById("description").innerHTML +=`Middle Cards left: ${limbo.length}<br><hr>`
        if (limbo.length > 0) {
            limbo.forEach(card => {
                player2.push(card);
            });
            limbo = [];
        }
        toggler = false;
        // toggle()

    }
    else if (pla1Card == pla2Card) {
        document.getElementById("description").innerHTML +=`${name1}'s Card: ${player1[0].name} (${pla1Card})<br>`
        document.getElementById("description").innerHTML +=`${name2}'s Card: ${player2[0].name} (${pla2Card})<br>`
        document.getElementById("description").innerHTML +="No one wins the round<br>"
        limbo.push(player1[0]);
        limbo.push(player2[0]);
        player2.shift();
        player1.shift();
        document.getElementById("description").innerHTML +=`${name1} Cards left: ${player1.length}<br>`
        document.getElementById("description").innerHTML +=`${name2} Cards left: ${player2.length}<br>`
        document.getElementById("description").innerHTML +=`Middle Cards left: ${limbo.length}<br><hr>`
    }
    if (player1.length == 0) {
        document.getElementById("log").innerHTML +=`${name2} wins the game`
    }
    else if (player2.length == 0) {
        document.getElementById("log").innerHTML +=`${name1} wins the game`
    }
}

const shuffle = (array) =>  {
    array.sort(() => Math.random()-0.5); // sorts array be randomising
    return array // returns random array
  }

// const rules = () => {
//     document.getElementById("description").innerHTML += `1- Player 1 will pick a statistic from their card<br>`
//     document.getElementById("description").innerHTML += `2- Player 2 will compares this number against the same statistic<br>`
//     document.getElementById("description").innerHTML += `3- Whoever has the highest statistic wins the other person's card<br>` 
//     document.getElementById("description").innerHTML += `4- The winner starts the next round<br>`
//     document.getElementById("description").innerHTML += `5- The first player to get all 30 cards wins the game<br> <hr>`
// }

const controls = () => {
    document.getElementById("description").innerHTML += `Controls: <br>1- Press “Set Names” to set the names of both players<br>`
    document.getElementById("description").innerHTML += `2- Press “Rules” to see the rules<br>`
    document.getElementById("description").innerHTML += `3- Press “See card” to view your current card<br>` 
    document.getElementById("description").innerHTML += `4- Choose which attribute to use by pressing a number<br> <hr>`
}

const namingPlayers = () => {
    name1= prompt(`What's your name player 1?`);
    document.getElementById("playerOneName").innerHTML = "Name: " + name1;
    name2= prompt(`Ok, what's your name player 2?`);
    document.getElementById("playerTwoName").innerHTML = "Name: " + name2;
    document.getElementById("fight").innerHTML = name1 + " vs " + name2;
}

let deck = [
    new CardGenerator("Venusaur", 40, 30, 42, 42, 100, 0),
    new CardGenerator("Charizard", 45, 34, 34, 55, 90.5, 0),
    new CardGenerator("Blastoise", 42, 35, 40, 40, 85.5, 0),
    new CardGenerator("Pickachu", 39, 28, 20, 58, 6, 0),
    new CardGenerator("Sandshrew", 40, 28, 44, 22, 12, 0),
    new CardGenerator("Mareep", 25, 26, 28, 25, 7.8, 0),
    new CardGenerator("Yanma", 38, 30, 22, 56, 38, 0),
    new CardGenerator("Miltank", 49, 48, 58, 55, 75.5, 0),
    new CardGenerator("Blissey", 10, 100, 10, 32, 46.8, 0),
    new CardGenerator("Tyranitar", 72, 48, 46, 34, 202, 0),
    new CardGenerator("Gardevoir", 39, 35, 38, 44, 48.4, 0),
    new CardGenerator("Breloom", 72, 35, 42, 46, 39.2, 0),
    new CardGenerator("Aggron", 66, 32, 88, 34, 360, 0),
    new CardGenerator("Flygon", 58, 34, 40, 58, 82, 0),
    new CardGenerator("Milotic", 31, 48, 34, 48, 162, 0),
    new CardGenerator("Luxray", 68, 38, 36, 44, 42, 0),
    new CardGenerator("Vespiquen", 45, 38, 48, 22, 38.5, 0),
    new CardGenerator("Lopunny", 45, 32, 44, 68, 33.3, 0),
    new CardGenerator("Spiritomb", 54, 22, 54, 26, 108, 0),
    new CardGenerator("Garchomp", 75, 46, 40, 55, 95, 0),
    new CardGenerator("Musharna", 31, 56, 42, 22, 60.5, 0),
    new CardGenerator("Zebstrika", 56, 34, 32, 62, 79.5, 0),
    new CardGenerator("Scolipede", 56, 32, 42, 60, 200.5, 0),
    new CardGenerator("Archeops", 75, 36, 35, 66, 32, 0),
    new CardGenerator("Hydreigon", 58, 48, 44, 55, 160, 0),
    new CardGenerator("Pyroar", 45, 45, 38, 68, 81.5, 0),
    new CardGenerator("Gogoat", 45, 50, 34, 42, 91, 0),
    new CardGenerator("Pangoro", 64, 44, 34, 38, 136, 0),
    new CardGenerator("Tyrantrum", 64, 36, 55, 46, 270, 0),
    new CardGenerator("Goodra", 52, 45,38, 42, 150.5, 0),
]

let player1 = shuffle(deck) // Calls shuffles method to change cards, all cards in player
let player2 = player1.splice(0, Math.ceil(player1.length / 2)); // Splits player deck and gives other half to other player (array), now cards in two seperate arrays

// Buttons inside of JS

let namingPlayersButton = document.getElementById("namingPlayers")
let rulesButton = document.getElementById("rules")
let controlsButton = document.getElementById("controls")
let clearButton = document.getElementById("clearButton")

let seeCardsButton1 = document.getElementById("seeCards1")
let seeCardsButton2 = document.getElementById("seeCards2")

namingPlayersButton.addEventListener("click", () => {
    namingPlayers()
});

rulesButton.addEventListener("click", () => {
    rules()
});

controlsButton.addEventListener("click", () => {
    controls()
});

clearButton.addEventListener("click", () => {
    clear()
});

seeCardsButton1.addEventListener("click", () => {
    if (!toggler) {
        document.getElementById("description").innerHTML +=`It is not your turn  <br> <hr>`
    }
    else {
        seeCards()
    }
});

seeCardsButton2.addEventListener("click", () => {
    if (toggler) {
        document.getElementById("description").innerHTML += `It is not your turn <br> <hr>`
    }
    else {
        seeCards()
    }
});

document.addEventListener("keydown", function(move) {
    if (move.which == 49) {
        document.getElementById("description").innerHTML += `You chose the "Attack" attribute <br>`
        compare(player1[0].attribute1, player2[0].attribute1);
    }
    else if (move.which == 50) {
        document.getElementById("description").innerHTML += `You chose the "Health" attribute <br>`
        compare(player1[0].attribute2, player2[0].attribute2);
    }
    else if (move.which == 51) {
        document.getElementById("description").innerHTML += `You chose the "Defense" attribute <br>`
        compare(player1[0].attribute3, player2[0].attribute3);
    }
    else if (move.which == 52) {
        document.getElementById("description").innerHTML += `You chose the "Speed" attribute <br>`
        compare(player1[0].attribute4, player2[0].attribute4);
    }
    else if (move.which == 53) {
        document.getElementById("description").innerHTML += `You chose the "Weight" attribute <br>`
        compare(player1[0].attribute5, player2[0].attribute5);
    }})



// Need to swap names, but seems to work