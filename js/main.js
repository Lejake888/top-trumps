let player1 = [];
let player2= [];
let name1;
let name2;
let toggler = true;
let deck = [];
let limbo = []; 
let names = ["Venusaur", "Charizard", "Blastoise", "Pikachu", "Sandshrew", "Mareep", "Yanma", "Miltank", "Blissey", "Tyranitar", "Gardevoir", "Breloom", "Aggron", "Flygon", "Milotic", "Luxray", "Vespiquen", "Lopunny", "Spiritomb", "Garchomp", "Musharna", "Zebstrika", "Scolipede", "Archeops", "Hydreigon", "Pyroar", "Gogoat", "Pangoro", "Tyrantrum", "Goodra"];
let attack = [40, 45, 42, 39, 40, 25, 38, 49, 10, 72, 39, 72, 66, 58, 31, 68, 45, 45, 54, 75, 31, 56, 56, 75, 58, 45, 45, 64, 64, 52];
let healthPoint = [30, 34, 35, 28, 28, 26, 30, 48, 100, 48, 35, 35, 32, 34, 48, 38, 38, 32, 22, 46, 56, 34, 32, 36, 48, 45, 50, 44, 36, 45];
let defense = [42, 34, 40, 20, 44, 28, 22, 58, 10, 46, 38, 42, 88, 40, 34, 36, 48, 44, 54, 40, 42, 32, 42, 35, 44, 38, 34, 34, 55, 38];
let speed = [42, 55, 40, 58, 22, 25, 56, 55, 32, 34, 44, 46, 34, 58, 48, 44, 22, 68, 26, 55, 22, 62, 60, 66, 55, 68, 42, 38, 46, 42];
let weight = [100, 90.5, 85.5, 6, 12, 7.8, 38, 75.5, 46.8, 202, 48.4, 39.2, 360, 82, 162, 42, 38.5, 33.3, 108, 95, 60.5, 79.5, 200.5, 32, 160, 81.5, 91, 136, 270, 150.5];
let wins = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

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
    document.getElementById("description1").innerHTML = `[Your Card: ${player1[0].name}]<br> 
    Attack: ${player1[0].attribute1}<br> 
    Health: ${player1[0].attribute2}<br> 
    Defense: ${player1[0].attribute3}<br> 
    Speed: ${player1[0].attribute4}<br> 
    Weight: ${player1[0].attribute5}<br> `
    document.getElementById("description2").innerHTML = `[Your Card: ???]<br> 
    Attack: ???<br> 
    Health: ???<br> 
    Defense: ???}<br> 
    Speed: ???<br> 
    Weight: ???<br> `
}

const toggle = () => {
    if (!toggler){
        alert(`${name1} lost the round! It's now ${name2}'s turn`) // need to work out name changes
        tempName = name1;
        name1 = name2;
        name2 = tempName;
        temp = player1;
        player1 = player2;
        player2 = temp;
        toggler = true;
    }  
}

const valueChoice = () => {
    setTimeout(5000) // setTimeout(function(){ alert("Hello"); }, 3000);
    let move = parseInt(prompt(`Choose a value to compare: 1: Attack, 2: Health, 3: Defense, 4: Speed 5: Weight [Your Card: ${player1[0].name}]`)); // Checks input is number 
        if (move == 1) {
            compare(player1[0].attribute1, player2[0].attribute1);
        }
        else if (move == 2) {
            compare(player1[0].attribute2, player2[0].attribute2);
        }
        else if (move == 3) {
            compare(player1[0].attribute3, player2[0].attribute3);
        }
        else if (move == 4) {
            compare(player1[0].attribute4, player2[0].attribute4);
        }
        else if (move == 5) {
            compare(player1[0].attribute5, player2[0].attribute5);
        }
}

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
        toggle()

    }
    else if (pla1Card == pla2Card) {
        document.getElementById("description").innerHTML +=`${name1}'s Card: ${player1[0].name} (${pla1Card})<br>`
        document.getElementById("description").innerHTML +=`${name2}'s Card: ${player2[0].name} (${pla2Card})<br>`
        document.getElementById("description").innerHTML +="No one wins the round"
        limbo.push(player1[0]);
        limbo.push(player2[0]);
        player2.shift();
        player1.shift();
        document.getElementById("description").innerHTML +=`${name1} Cards left: ${player1.length}<br>`
        document.getElementByIdX("description").innerHTML +=`${name2} Cards left: ${player2.length}<br>`
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

const rules = () => {

}

const controls = () => {
    document.getElementById("description").innerHTML += `Controls: <br>Press “Set Names” to set the names of both players<br>`
    document.getElementById("description").innerHTML += `Press “Rules” to see the rules<br>`
    document.getElementById("description").innerHTML += `Press “See card” to view your current card<br>` 
    document.getElementById("description").innerHTML += `Press “Play” to make your move<br> <hr>`
}

const namingPlayers = () => {
    name1= prompt(`What's your name player 1?`);
    document.getElementById("playerOneName").innerHTML = "Name: " + name1;
    name2= prompt(`Ok, what's your name player 2?`);
    document.getElementById("playerTwoName").innerHTML = "Name: " + name2;
    document.getElementById("fight").innerHTML = name1 + " vs " + name2;
}

for (i=0;i<names.length;i++) 
    deck.push(new CardGenerator(names[i], attack[i], healthPoint[i], defense[i], speed[i], weight[i], wins[i])); // Each card is made and pushed onto an array

player1 = shuffle(deck) // Calls shuffles method to change cards, all cards in player
player2 = player1.splice(0, Math.ceil(player1.length / 2)); // Splits player deck and gives other half to other player (array), now cards in two seperate arrays

toggle()

// Convert to something like below

// let deck = [
//     new CardGenerator("Venusaur", 1,2,3,4,5,6),
//     new CardGenerator("Venusaur", 1,2,3,4,5,6),
// ]



// 2 players (two compare functions? Swap arrays so player carries on?)
// make counter = 0, if counter > 0 and they lose, they swap, when they lose the round their counter reset to 0
// two different functions, player1turn & player2turn, toggle between functions