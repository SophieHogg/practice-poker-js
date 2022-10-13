// Steps: Create deck
// Randomly draw cards from deck
// If cards repeat, redraw
// Reset button

let fold = document.getElementById("fold");
let check = document.getElementById("check");
let redeal = document.getElementById("redeal");

var suits = ["hearts", "clubs", "diamonds", "spades"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let flopOcc = false;
let turnOcc = false;
let riverOcc = false;
let dealOcc = false;

function getDeck() {
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let x = 0; x < values.length; x++) {
            let card = { value: values[x], suit: suits[i] };
            deck.push(card);
        }
    }
    return deck;
}
var deck1 = getDeck();
shuffle(deck1);
//now that the deck is created, need to shuffle it by randomising the order.
//this code represents the Durstenfeld shuffle and is based on the Wikipedia article
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // returns a random index (for a random card) between 0 and i
        [deck[i], deck[j]] = [deck[j], deck[i]]; // swaps j and i card.
    }
}

function drawCard(card) {
    let cardCol = "black";
    if (card.suit == "diamonds" || card.suit == "hearts") {
        cardCol = "red";
    }
    const newCard = document.createElement("div");
    newCard.classList.add("poker__card");
    var text = document.createTextNode(`${card.value} ${card.suit}`);
    newCard.appendChild(text);
    newCard.style.color = cardCol;
    pokerhand.appendChild(newCard);
}
function placeCard(card) {
    let cardCol = "black";
    if (card.suit == "diamonds" || card.suit == "hearts") {
        cardCol = "red";
    }
    const newCard = document.createElement("div");
    newCard.classList.add("poker__card");
    var text = document.createTextNode(`${card.value} ${card.suit}`);
    newCard.appendChild(text);
    newCard.style.color = cardCol;
    tabled.appendChild(newCard);
}

function deal() {
    console.log(deck1[0]);
    console.log(deck1[1]);
    drawCard(deck1[0]);
    drawCard(deck1[1]);
    dealOcc = true;
}

function flop() {
    placeCard(deck1[2]);
    placeCard(deck1[3]);
    placeCard(deck1[4]);
    flopOcc = true;
}

function turn() {
    placeCard(deck1[5]);
    turnOcc = true;
}

function river() {
    placeCard(deck1[6]);
    riverOcc = true;
}

deal();

fold.addEventListener("click", () => {
    if (!flopOcc) {
        flop();
        turn();
        river();
    } else if (!turnOcc) {
        turn();
        river();
    } else if (!riverOcc) {
        river();
    }
    //You achieved a ... - extension task
});

check.addEventListener("click", () => {
    if (!flopOcc) {
        flop();
    } else if (!turnOcc) {
        turn();
    } else if (!riverOcc) {
        river();
    }
    // else{"You achieved a ... - extension task"}
});

redeal.addEventListener("click", () => {
    tabled.innerHTML = "";
    pokerhand.innerHTML = "";
    flopOcc = false;
    turnOcc = false;
    riverOcc = false;
    dealOcc = false;
    deal();
});
