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
    alert(`       [Your Card: ${player1[0].name}] 
    Attack: ${player1[0].attribute1} 
    Health: ${player1[0].attribute2} 
    Defense: ${player1[0].attribute3}
    Speed: ${player1[0].attribute4}
    Weight: ${player1[0].attribute5}`);
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
        else if (move== 5) {
            compare(player1[0].attribute5, player2[0].attribute5);
        }
}

const compare = (pla1Card, pla2Card) => {   
    if (pla1Card > pla2Card) { 
        console.log(`${name1}'s Card: ${player1[0].name} (${pla1Card})`);
        console.log(`${name2}'s Card: ${player2[0].name} (${pla2Card})`);
        console.log(`${name1} wins the round`);
        player1[0].wins ++;
        player1.push(player2[0]);
        player2.shift();
        let top = player1.shift();
        player1.push(top);
        console.log(`${player1[player1.length-1].name} wins: ${player1[player1.length-1].wins}`);
        console.log(`${name1} Cards left: ${player1.length}`);
        console.log(`${name2} Cards left: ${player2.length}`);
        console.log(`Middle Cards left: ${limbo.length}`);
        if (limbo.length > 0) {
            limbo.forEach(card => {
                player1.push(card);
            });
            limbo = []; // Empties array, since these cards have now been recorded
        }

    }
    else if (pla1Card < pla2Card) {
        console.log(`${name1}'s Card: ${player1[0].name} (${pla1Card})`);
        console.log(`${name2}'s Card: ${player2[0].name} (${pla2Card})`);
        console.log(`${name2} wins the round`);
        player2[0].wins ++;
        player2.push(player1[0]);
        player1.shift();
        let top = player2.shift();
        player2.push(top);
        console.log(`${player2[player2.length-1].name} wins: ${player2[player2.length-1].wins}`);
        console.log(`${name1} Cards left: ${player1.length}`);
        console.log(`${name2}  Cards left: ${player2.length}`);
        console.log(`Middle Cards left: ${limbo.length}`);
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
        console.log(`${name1}'s Card: ${player1[0].name} (${pla1Card})`);
        console.log(`${name2}'s Card: ${player2[0].name} (${pla2Card})`);
        console.log("No one wins the round");
        limbo.push(player1[0]);
        limbo.push(player2[0]);
        player2.shift();
        player1.shift();
        console.log(`${name1} Cards left: ${player1.length}`);
        console.log(`${name2} Cards left: ${player2.length}`);
        console.log(`Middle Cards left: ${limbo.length}`);
    }
    if (player1.length == 0) {
        console.log(`${name2} wins the game`);
    }
    else if (player2.length == 0) {
        console.log(`${name1} wins the game`);
    }
}

const shuffle = (array) =>  {
    array.sort(() => Math.random()-0.5); // sorts array be randomising
    return array // returns random array
  }

const rules = () => {
    alert(`Player 1 will pick a statistic from their card (1/4)`)
    alert(`Player 2 will compares this number against the same statistic (2/4)`)
    alert(`Whoever has the highest statistic wins the other person's card (3/4)`)
    alert(`The first player to get all 30 cards wins the game (4/4)`)
}

const namingPlayers = () => {
    name1= prompt(`What's your name player 1?`);
    name2= prompt(`Ok, what's your name player 2?`);
    
}

for (i=0;i<names.length;i++) 
    deck.push(new CardGenerator(names[i], attack[i], healthPoint[i], defense[i], speed[i], weight[i], wins[i])); // Each card is made and pushed onto an array

player1 = shuffle(deck) // Calls shuffles method to change cards, all cards in player
player2 = player1.splice(0, Math.ceil(player1.length / 2)); // Splits player deck and gives other half to other player (array), now cards in two seperate arrays

toggle()

// 2 players (two compare functions? Swap arrays so player carries on?)
// make counter = 0, if counter > 0 and they lose, they swap, when they lose the round their counter reset to 0
// two different functions, player1turn & player2turn, toggle between functions