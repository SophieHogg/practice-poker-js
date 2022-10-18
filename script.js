// Steps: Create deck
// Randomly draw cards from deck
// If cards repeat, redraw
// Reset button

let fold = document.getElementById("fold");
let check = document.getElementById("check");
let redeal = document.getElementById("redeal");
let restart = document.getElementById("restart");
let submit = document.getElementById("submit");
let popup = document.getElementById("popup");
let money = document.getElementById("money");
let pot = document.getElementById("pot");

var suits = ["hearts", "clubs", "diamonds", "spades"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

var playerMoney = 1000;
var potMoney = 0;

money.innerHTML = playerMoney;
pot.innerHTML = potMoney;

let flopOcc = false;
let turnOcc = false;
let riverOcc = false;
let dealOcc = false;

//create deck by looping through and adding every value to each suit and pushing these 'card' elements to an array.
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

//now that the deck is created, need to shuffle it by randomising the order. This code represents the Durstenfeld shuffle (code adapted from Wikipedia)
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // returns a random index (for a random card) between 0 and i
        [deck[i], deck[j]] = [deck[j], deck[i]]; // swaps j and i card.
    }
}

shuffle(deck1);

//now need to create the card as an HTML element based on the array element. This function also determines whether the card goes to the table or to the player hand (in future, may also go to opponent hand).
function createCard(destination, card) {
    const newCard = document.createElement("div");
    newCard.classList.add("poker__card");
    var text = document.createTextNode(`${card.value}`);
    newCard.appendChild(text);
    addSuit(newCard, card.suit);
    destination.appendChild(newCard);
}

//this function adds the correct suit image to the card, and also defines the card colour (black or red)
function addSuit(newCard, suit) {
    var cardCol = "black";
    var suitImg = document.createElement("img");
    suitImg.classList.add("poker__card__suitImg");
    var cardSuit = document.createElement("div");
    cardSuit.classList.add("poker__card__cardSuit");
    switch (suit) {
        case "hearts":
            suitImg.src = "images/card-heart.png";
            cardCol = "red";
            break;
        case "diamonds":
            suitImg.src = "images/card-diamond.png";
            cardCol = "red";
            break;
        case "spades":
            suitImg.src = "images/card-spade.png";
            break;
        case "clubs":
            suitImg.src = "images/card-club.png";
            break;
        // if something goes wrong and none of the card suits are found, a joker will display
        default:
            suitImg.src = "images/card-joker.png";
            break;
    }
    cardSuit.appendChild(suitImg);
    newCard.appendChild(cardSuit);
    newCard.style.color = cardCol;
}

//this deals out cards to the user.
function deal() {
    createCard(pokerhand, deck1[0]);
    createCard(pokerhand, deck1[1]);
    dealOcc = true;
}

//this deals the first cards to the table
function flop() {
    createCard(tabled, deck1[2]);
    createCard(tabled, deck1[3]);
    createCard(tabled, deck1[4]);
    flopOcc = true;
}

//this deals the fourth card to the table
function turn() {
    createCard(tabled, deck1[5]);
    turnOcc = true;
}

//this deals the fifth card to the table
function river() {
    createCard(tabled, deck1[6]);
    riverOcc = true;
}

deal();

//this occurs if the player selects fold: reveals all remaining cards
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

//since this is used twice (in the check event Listener and the bidding submission event listener)
function newCard() {
    if (!flopOcc) {
        flop();
    } else if (!turnOcc) {
        turn();
    } else if (!riverOcc) {
        river();
    }
}

//if the player clicks check, the next set of cards will display
check.addEventListener("click", () => {
    newCard();
    // else{"You achieved a ... - extension task"}
});

//if the player hits redeal at any time, all tabled cards will be removed and the player will be dealt two new cards from the shuffled deck
redeal.addEventListener("click", () => {
    tabled.innerHTML = "";
    pokerhand.innerHTML = "";
    flopOcc = false;
    turnOcc = false;
    riverOcc = false;
    dealOcc = false;
    potAmount = 0;
    shuffle(deck1);
    deal();
});

restart.addEventListener("click", () => {
    tabled.innerHTML = "";
    pokerhand.innerHTML = "";
    flopOcc = false;
    turnOcc = false;
    riverOcc = false;
    dealOcc = false;
    shuffle(deck1);
    deal();
    playerMoney = 1000;
    potMoney = 0;
    money.innerHTML = playerMoney;
    pot.innerHTML = potMoney;
});

//if the player clicks the bid button, they have the option to type in any number. This is the value they wish the bid for.
function showBox() {
    popup.classList.toggle("poker__buttons__text__show");
    submit.classList.toggle("poker__buttons__submit__show");
}

//they must then be able to submit this bid. This should change the amount in the pot, the amount they have remaining, and should automatically draw the next card.

submit.addEventListener("click", () => {
    let bidAmount = parseInt(popup.value);
    playerMoney = playerMoney - bidAmount;
    money.innerHTML = playerMoney;
    potMoney = potMoney + bidAmount;
    pot.innerHTML = potMoney;
    newCard();
});
