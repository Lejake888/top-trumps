let toggler = true; // Toggle used to switch between player 1 and player 2
let name1; // name1 and name2 have to be global, otherwise name won't display on webpage
let name2;
let limbo = []; // Empty array, tied cards get pushed here
let image1 = document.getElementById("player1image") // Loads in image tags, can change the source later in the program
let image2 = document.getElementById("player2image")
let counter = 0; // Counter used to keep track of how many rounds there have been

class CardGenerator {  // Creates each card
    constructor(n,a,b,c,d,e,w) {
    this.name = n; 
    this.attribute1 = a; 
    this.attribute2 = b;
    this.attribute3 = c;
    this.attribute4 = d;
    this.attribute5 = e;
    this.wins = w; 
    }
}

const winCheck = () => { // Checks if any player has won, happens each round
    if (player1.length == 0) { // If the length of player 1 is 0, player 2 has won, and vice versa
        document.getElementById("description").innerHTML +=`${name2} wins the game<br>Number of rounds: ${counter}<br>`
    }
    else if (player2.length == 0) {
        document.getElementById("description").innerHTML +=`${name1} wins the game<br>Number of rounds: ${counter}<br>`
    }
}

const reset = () => { // Game starts again, quick test, may implement an "undo" button
    window.location.reload();
}

const clear = () => { // Clears the description if users decided to clear the log
    let log = document.getElementById("description")
    log.textContent = " "
}

const seeCards = () => { // See card == drawing a card
    if (toggler) { // Checks if player 1 is playing
        document.getElementById("description1").innerHTML = `[Your Card: ${player1[0].name}]<br> 
        Attack: ${player1[0].attribute1}<br> 
        Health: ${player1[0].attribute2}<br> 
        Defense: ${player1[0].attribute3}<br> 
        Speed: ${player1[0].attribute4}<br> 
        Weight: ${player1[0].attribute5}<br> 
        Amount Of Cards: ${player1.length}` // Displays all the stats of player 1's card
        image1.src = `images/pokemon/${player1[0].name}.png` // Sets image source of the top card by refering to the first card in player 1's deck (array)
        image2.src = `images/pokemon/unknown.png` // Since this card is supposed to be hidden, it has a filler image
        document.getElementById("description2").innerHTML = `[Your Card: ???]<br> 
        Attack: ???<br> 
        Health: ???<br> 
        Defense: ???}<br> 
        Speed: ???<br> 
        Weight: ???<br> 
        Amount Of Cards: ${player2.length}` // Stats are unknown, placeholder there instead
    }
    else { // if toggler == false, it's player 2's turn, the same as if, except reversed
        document.getElementById("description2").innerHTML = `[Your Card: ${player2[0].name}]<br> 
        Attack: ${player2[0].attribute1}<br> 
        Health: ${player2[0].attribute2}<br> 
        Defense: ${player2[0].attribute3}<br> 
        Speed: ${player2[0].attribute4}<br> 
        Weight: ${player2[0].attribute5}<br> 
        Amount Of Cards: ${player2.length}`
        image1.src = `images/pokemon/unknown.png`
        image2.src = `images/pokemon/${player2[0].name}.png`
        document.getElementById("description1").innerHTML = `[Your Card: ???]<br> 
        Attack: ???<br> 
        Health: ???<br> 
        Defense: ???}<br> 
        Speed: ???<br> 
        Weight: ???<br> 
        Amount Of Cards: ${player1.length}`
    }
}

const compare = (pla1Card, pla2Card) => { // Compares the value of the stat chosen from each card
    counter += 1; // Counter tracks number of rounds, so each time a round is played, counter increments by 1
    if (toggler) { // Checks if it's player 1's turn
        document.getElementById("description").innerHTML +=`<u>Round ${counter}:</u><br> ${name1}'s turn<br><hr>`
    }
    else { // Else it's player 2's turn
        document.getElementById("description").innerHTML +=`<u>Round ${counter}:</u><br> ${name2}'s turn<br><hr>`
    }
    if (pla1Card > pla2Card) { // If player 1 has the higher stat
        document.getElementById("description").innerHTML +=`${name1}'s Card: ${player1[0].name} (${pla1Card})<br>` // Displays both stats
        document.getElementById("description").innerHTML +=`${name2}'s Card: ${player2[0].name} (${pla2Card})<br>`
        document.getElementById("description").innerHTML +=`${name1} wins the round<br>` // This is if player 1 has won the round
        player1[0].wins ++; // Increments the winning card's stat
        player1.push(player2[0]); // Losing card copied into player 1's deck
        player2.shift(); // Losing card removed from player 2's deck
        let top = player1.shift(); // Shift the top card on player 1's deck
        player1.push(top); // Since we don't want to lose this card, the "top" card is added to the bottom of the deck
        if (limbo.length > 0) { // Checks if there are any cards in limbo
            limbo.forEach(card => { // If there are cards in limbo, they are added to the winner's deck
                player1.push(card);
            });
            limbo = []; // Reset limbo so there are no duplicated cards
        }
        document.getElementById("description").innerHTML +=`${player1[player1.length-1].name} wins: ${player1[player1.length-1].wins}<br>` // Displays stats including player 1's cards, player 2's cards and middle cards
        document.getElementById("description").innerHTML +=`${name1} Cards left: ${player1.length}<br>`
        document.getElementById("description").innerHTML +=`${name2} Cards left: ${player2.length}<br>`
        document.getElementById("description").innerHTML +=`Middle Cards left: ${limbo.length}<br><hr>`
        toggler = true; // Since it's player 1's turn still, toggler is still true
    }
    else if (pla1Card < pla2Card) { // If player 2 has the higher stat, similar to player 1 winning 
        document.getElementById("description").innerHTML +=`${name1}'s Card: ${player1[0].name} (${pla1Card})<br>`
        document.getElementById("description").innerHTML +=`${name2}'s Card: ${player2[0].name} (${pla2Card})<br>`
        document.getElementById("description").innerHTML +=`${name2} wins the round<br>`
        player2[0].wins ++; // The winning card's winning stat is incremented by 1
        player2.push(player1[0]);
        player1.shift();
        let top = player2.shift();
        player2.push(top);
        if (limbo.length > 0) {
            limbo.forEach(card => {
                player2.push(card);
            });
            limbo = [];
        }
        document.getElementById("description").innerHTML +=`${player2[player2.length-1].name} wins: ${player2[player2.length-1].wins}<br>`
        document.getElementById("description").innerHTML +=`${name1} Cards left: ${player1.length}<br>`
        document.getElementById("description").innerHTML +=`${name2}  Cards left: ${player2.length}<br>`
        document.getElementById("description").innerHTML +=`Middle Cards left: ${limbo.length}<br><hr>`
        toggler = false; // Since player 2 has won, it's their turn next, so toggler == false
    }
    else if (pla1Card == pla2Card) { // If the stats match
        document.getElementById("description").innerHTML +=`${name1}'s Card: ${player1[0].name} (${pla1Card})<br>`
        document.getElementById("description").innerHTML +=`${name2}'s Card: ${player2[0].name} (${pla2Card})<br>`
        document.getElementById("description").innerHTML +="No one wins the round<br>"
        limbo.push(player1[0]); // Both of the top cards are added to limbo and removed
        limbo.push(player2[0]);
        player2.shift();
        player1.shift();
        document.getElementById("description").innerHTML +=`${name1} Cards left: ${player1.length}<br>`
        document.getElementById("description").innerHTML +=`${name2} Cards left: ${player2.length}<br>`
        document.getElementById("description").innerHTML +=`Middle Cards left: ${limbo.length}<br><hr>`
    }
    winCheck() // Every round that is played, the program checks if there is a winner
}

const shuffle = (array) =>  { // Randomises the order of the generated deck, this random deck is returned, deck is passed through
    array.sort(() => Math.random()-0.5);
    return array 
  }

const rules = () => { // Displays the rules in log box
    document.getElementById("description").innerHTML += `<u>Rules:</u> <br>1- All 30 cards are dealt out<br>2- Player 1 will pick a statistic from their card<br>3- The attribute chosen is compared between both players<br>4- The highest number wins both cards, that player starts the next round<br>5- If there is a tie, the cards are put in the middle, the winner of the next round gets those cards too<br>6- The first player to all 30 cards wins<hr>`
}

const controls = () => { // Displays the controls in log box
    document.getElementById("description").innerHTML += `<u>Controls:</u> <br>1- Press “Set Names” to set the names of both players<br>2- Press “Rules” to see the rules<br>3- Press “See card” to view your current card<br>4- Press "Reset" to start a start a new game<br>5- Choose which attribute to use by pressing a number<br> <hr>`
}

const namingPlayers = () => { // Now uses forms to get the names of players
    name1 = document.getElementById("playerOneName").value
    name2 = document.getElementById("playerTwoName").value

    if (!name1 || !name2) {
        alert("Please enter names for both players")
    }
    else if (name1 && name2) {
        document.getElementById("name1").innerHTML = `Name: ${name1}`
    document.getElementById("name2").innerHTML = `Name: ${name2}`
    document.getElementById("fight").innerHTML = `${name1} vs ${name2}`
        let box1 = document.getElementById("inputBox1")
        let box2 = document.getElementById("inputBox2")
        let input1 = document.getElementById("input1")
        let input2 = document.getElementById("input2")    
        box1.removeChild(input1);
        box2.removeChild(input2);
    }
}

let deck = [ // An array of 30 objects, each card generation is placed inside the array, making 30 objects in an array
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
        new CardGenerator("Goodra", 52, 45,38, 42, 150.5, 0)
]

let player1 = shuffle(deck) // Deck of 30 objects passed to the shuffle function, randomises order
let player2 = player1.splice(0, Math.ceil(player1.length / 2)); // Half of the deck is added to player 2, the rest is left as player 1

// All buttons are called here

let namingPlayersButton = document.getElementById("namingPlayers")  
let rulesButton = document.getElementById("rules")
let controlsButton = document.getElementById("controls")
let resetButton = document.getElementById("reset")
let clearButton = document.getElementById("clearButton")

let seeCardsButton1 = document.getElementById("seeCards1")
let seeCardsButton2 = document.getElementById("seeCards2")

// Commands for each button click, calls a different function for each respecitively

namingPlayersButton.addEventListener("click", () => {
    namingPlayers()
});

rulesButton.addEventListener("click", () => {
    rules()
});

controlsButton.addEventListener("click", () => {
    controls()
});

resetButton.addEventListener("click", () => {
    reset()
});

clearButton.addEventListener("click", () => {
    clear()
});

seeCardsButton1.addEventListener("click", () => {
    // If it's player 2's turn aka toggler == false, player 1 can't play, and a message is displayed 
    if (!toggler) {
        document.getElementById("description").innerHTML +=`It is not your turn...  <br> <hr>`
    }
    else {
        seeCards()
    }
});

seeCardsButton2.addEventListener("click", () => {
    // If it's player 1's turn aka toggler == true, player 2 can't play, and a message is displayed 
    if (toggler) {
        document.getElementById("description").innerHTML += `It is not your turn... <br> <hr>`
    }
    else {
        seeCards()
    }
});

document.addEventListener("keydown", function(move) {
    // Uses button presses to choose a statistic. For example, pressing '1' will load the 'attack' attributes into the compare function
    if (move.which == 49) {
        compare(player1[0].attribute1, player2[0].attribute1);
    }
    else if (move.which == 50) {
        compare(player1[0].attribute2, player2[0].attribute2);
    }
    else if (move.which == 51) {
        compare(player1[0].attribute3, player2[0].attribute3);
    }
    else if (move.which == 52) {
        compare(player1[0].attribute4, player2[0].attribute4);
    }
    else if (move.which == 53) {
        compare(player1[0].attribute5, player2[0].attribute5);
    }})