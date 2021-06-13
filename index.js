var lettersDict = {1:"first", 2:"second", 3:"third", 4:"fourth", 5:"fifth", 6:"sixth", 7:"seventh", 8:"eighth", 9:"ninth", 10:"tenth"};

var players = 4;
var totalCards = 208;
let suits = ['Hearts', 'Diamond', 'Club', 'Spades'];
let values = ['Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack', 'Queen', 'King', 'Ace',
            'Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack', 'Queen', 'King', 'Ace',
            'Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack', 'Queen', 'King', 'Ace',
            'Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack', 'Queen', 'King', 'Ace'];
var deck = [];
//var card = [];
var tileValues = [];
var cardIdToFace = {};
var faceToNumber = {"Two":2, "Three":3, "Four":4, "Five":5, "Six":6, "Seven":7, "Eight":8,
                     "Nine":9, "Ten":10, "Jack":11, "Queen":12, "King":13, "Ace":14}
var carsPos = [0,0,0,0];
var carAccelerate = "accelerate";
var carTime = [1500, 750, 850, 1200];
var enableCardCounter = 104;
var enableCard = 52;

class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }
}

class Deck{
    constructor(){
        this.deck = [];
    }

    createDeck(suits, values){
        for(let suit of suits){
            for(let value of values){
                this.deck.push(new Card(suit,value));
            }
        }
        return this.deck;
    }

    shuffle(){
       // for(let i = 0; i < 5; i++){
            let counter = this.deck.length, temp, i;
            while(counter){
                i = Math.floor(Math.random() * counter--);
                temp = this.deck[counter];
                this.deck[counter] = this.deck[i];
                this.deck[i] = temp;
            }
      //  }
        return this.deck;
    }

    deal(){
        var card = this.deck.pop();
        return card;
    }
}

window.onload = function(){
    var entryIndex = 0;
    var entryInterval = setInterval(function(){
        entryIndex++;
        driveAnimation(entryIndex);
        if(entryIndex == 10){
        clearInterval(entryInterval);
      }
    },300);

    //card deal
    {
        deck = new Deck();
        deck.createDeck(suits, values);
        deck.shuffle();
    
        var base = 52;
        var init = base;
        //assign images to card tiles
        for(let suit = 1; suit <= suits.length; suit++){
            for(let i = 1; i <= values.length; i++){
                qsa = (init+i).toString();
                var card = this.deck.deal();
                cardIdToFace[qsa] = card.value;
                //console.log(qsa);
                id(qsa).src = "Cards\\" + card.suit + card.value + ".png";
            }
            init = init + base*2; 
        }
    }

    id("card52").classList.remove("noClick");
    hideCards();
    flipCards();
    /*
    var click = 1;
    document.getElementById("car1").addEventListener("click", function(){
        if(click===1){
            document.getElementById("car1").classList.add("accelerate1pos1");
            setTimeout(function(){
                document.getElementById("car1").style.left = "120px";
            },1500);
            click++;
        }
        else{
            document.getElementById("car1").classList.add("accelerate1pos2");
            setTimeout(function(){
                document.getElementById("car1").style.left = "240px";
            },1500);
        }
    });*/
}

function driveAnimation(identifier){
    var top = 2;
    id(lettersDict[identifier]).classList.remove("hidden1");
    var className = "header_animation" + lettersDict[identifier] 
    id(lettersDict[identifier]).classList.add(className);
    
    setTimeout(function(){
      id(lettersDict[identifier]).style.left = (top*(identifier-1)).toString()+"%";
      id(lettersDict[identifier]).style.top = "5%";
    },2500);
  }

//hide face cards
function hideCards(){
    let cardsPerPlayer = totalCards / players;
    var stringNumber = cardsPerPlayer;
    var stringName = "card";
    for(let player = 1; player <= players; player++){
        for(let cardNumber = 1; cardNumber <= cardsPerPlayer; cardNumber++){
            stringNumber = stringNumber + 1;
            document.getElementById(stringName + stringNumber.toString()).style.visibility = "hidden";
        }
        stringNumber = stringNumber + cardsPerPlayer;
        //console.log(stringNumber);
    }
}

//flip cards on click
function flipCards(){
    let cardsPerPlayer = totalCards / players;
    var stringNumber = 0;
    for(let player = 1; player <= players; player++){
        for(let cardNumber = 1; cardNumber <= cardsPerPlayer; cardNumber++){
            stringNumber = stringNumber + 1;
            addclickEventListener(stringNumber, (player*cardsPerPlayer*2)-cardNumber);
        }
        stringNumber = stringNumber + cardsPerPlayer;
    }
}

//reverse flip every card on finish-futureScope
/*
function reverseFlipCards(){
    console.log("reverseFlipCards");
    //flip all tiles together
    var tile1BackIndex = totalCards/players;
    var tile1FrontIndex = tile1BackIndex + 1;
    var tile2BackIndex = tile1BackIndex+(totalCards/2);
    var tile2FrontIndex = tile2BackIndex + 1;
    var tile3BackIndex = tile2BackIndex+(totalCards/2);
    var tile3FrontIndex = tile3BackIndex + 1;
    var tile4BackIndex = tile3BackIndex+(totalCards/2);
    var tile4FrontIndex = tile4BackIndex + 1;
    var tile1Timer;
    var tile2Timer;
    var tile3Timer;
    var tile4Timer;
    tile1Timer = setInterval(function(){
        id(tile1BackIndex.toString()).classList.remove("is_flip");
        id("card"+tile1BackIndex.toString()).style.display = "block";
        id(tile1FrontIndex.toString()).classList.remove("is_reverseflip");
        tile1BackIndex--;
        tile1FrontIndex++;
        console.log((tile1FrontIndex+"_"+tile1BackIndex));
        //stop timer
        if((tile1FrontIndex - tile1BackIndex) === (totalCards/2)+1){
            clearTimeout(tile1Timer)
        }
    },20);
    tile2Timer = setInterval(function(){
        id(tile2BackIndex.toString()).classList.remove("is_flip");
        id("card"+tile2BackIndex.toString()).style.display = "block";
        id(tile2FrontIndex.toString()).classList.remove("is_reverseflip");
        tile2BackIndex--;
        tile2FrontIndex++;
        console.log((tile2FrontIndex - tile2BackIndex));
        //stop timer
        if((tile2FrontIndex - tile2BackIndex) === (totalCards/2)+1){
            clearTimeout(tile2Timer)
        }

    },20);
    tile3Timer = setInterval(function(){
        id(tile3BackIndex.toString()).classList.remove("is_flip");
        id("card"+tile3BackIndex.toString()).style.display = "block";
        id(tile3FrontIndex.toString()).classList.remove("is_reverseflip");
        tile3BackIndex--;
        tile3FrontIndex++;
        console.log((tile3FrontIndex - tile3BackIndex));
        //stop timer
        if((tile3FrontIndex - tile3BackIndex) === (totalCards/2)+1){
            clearTimeout(tile3Timer)
        }
    },20);
    tile4Timer = setInterval(function(){
        id(tile4BackIndex.toString()).classList.remove("is_flip");
        id("card"+tile4BackIndex.toString()).style.display = "block";
        id(tile4FrontIndex.toString()).classList.remove("is_reverseflip");
        tile4BackIndex--;
        tile4FrontIndex++;
        console.log((tile4FrontIndex - tile4BackIndex));
        //stop timer
        if((tile4FrontIndex - tile4BackIndex) === (totalCards/2)+1){
            clearTimeout(tile4Timer)
        }
    },20);
}
*/

//event listener on flip;
function addclickEventListener(back, face){
    var stringName = "card"; 
    var backCard = stringName + back.toString();
    var faceCard = stringName + (face+1).toString();
    
    //console.log(backCard+'_'+faceCard);
    id(backCard).addEventListener("click", function(){
        //console.log(backCard+'_'+faceCard);
        enableCards();
        tileValues.push(faceToNumber[cardIdToFace[face+1]]);
        //console.log((face+1).toString());
        id(backCard).classList.toggle("is_flip"); 
        id(faceCard).classList.toggle("is_reverseflip");
        setTimeout(function(){
            id(backCard).style.display = "none";
            id(faceCard).style.visibility = "visible";
            if(back >= 313 && back <= 364){
                validateAndMoveCar()
                clearTileValues();
            }
        },500);
    });
}

function enableCards(){
    if((enableCard + (totalCards/2)) > totalCards*2){
        enableCard = (enableCard + (totalCards/2) - 1) % (totalCards*2);
    }
    else{
        enableCard = enableCard + (totalCards/2);
    }
    id("card"+enableCard.toString()).classList.remove("noClick");
}

function validateAndMoveCar(){
    var carsToMove = [];
    var sortedTileValues = Array.from(Array(tileValues.length).keys())
                  .sort((a, b) => tileValues[a] > tileValues[b] ? -1 : (tileValues[b] < tileValues[a]) | 0);
    carsToMove.push(sortedTileValues[0]);
    
    for(let index = 1; index < sortedTileValues.length; index++){
        if(tileValues[sortedTileValues[index]] === tileValues[sortedTileValues[0]]){
            carsToMove.push(sortedTileValues[index]);
        }
        else{
            break;
        }
    }
    setTimeout(function(){
        accelerateCars(carsToMove);
    },1100);
}

function accelerateCars(cars){
    for(let carIndex = 0; carIndex < cars.length; carIndex++){
        carsPos[cars[carIndex]]++;
        var carClass = carAccelerate + (cars[carIndex]+1).toString() + "Pos" + carsPos[cars[carIndex]].toString();
        id("car"+ (cars[carIndex]+1).toString()).classList.add(carClass);
        setTimeout(function(){
            id("car"+ (cars[carIndex]+1).toString()).style.left = (120*carsPos[cars[carIndex]]).toString()+"px";
        }, carTime[cars[carIndex]]);
    }
}

function clearTileValues(){
    tileValues = [];
}

//helper functions
function id(value){
    return document.getElementById(value);
}