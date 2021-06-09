/**
 * Il computer deve generare 16 numeri casuali tra 1 e 100. 
 * I numeri non possono essere duplicati.
 * In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100. 
 * L’utente non può inserire più volte lo stesso numero.
 * Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero. 
 * La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
 * Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
 * BONUS: (da fare solo se funziona tutto il resto) all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali: con difficoltà 0 => tra 1 e 100 con difficoltà 1 => tra 1 e 80 con difficoltà 2 => tra 1 e 50
 */

//Livello difficoltà
var difficulty = 100;
//Numero di livelli
var levels = difficulty - 16;
//Array contenente i numeri che l'utente sceglierà
var chosenNumbers = [];
//Elementi box nell'html
var ele = document.getElementsByClassName('box');

//Facciamo selezionare all'utente il livello di gioco
var chooseLevel = parseInt(prompt('Inserisci il numero di livello gioco: 1  2 o 3'));

while(isNaN(chooseLevel) || (chooseLevel <= 0 || chooseLevel > 3)){
    alert('Attenzione inserisci un valore da 1 a 3');
    chooseLevel = parseInt(prompt('Inserisci il numero di livello gioco: 1  2 o 3'));
}

switch(chooseLevel){
    case 2:
        difficulty = 80;
        break;
    case 3:
        difficulty = 50;
        break;
}


//Creiamo l'array contenente i 16 numeri generati da 1 a difficulty (default 100)
var itemsNumRandom = getCreateNumber(difficulty)
console.log(itemsNumRandom);

//Inseriamo gli elementi (box) nell'HTML
insertionEleDom(difficulty);

//avviare l'evento a ogni click dell'elemento
for(i = 0; i < ele.length; i++){
    ele[i].addEventListener('click', function(event){
        var result =  logicGame(difficulty, itemsNumRandom, Array.from(ele).indexOf(event.target) + 1, event.target);
        if(result){
            window.location.reload();
        }
    });
}



/**
 * Esempio con il prompt
 * Funzione che effettua la logica del gioco
 * @param {number} max
 * @param {array} arrayNum
 * @returns
 */
/*
function logicGame(max, arrayNum){
    var status = true;
    var levels = max - 16;
    var chosenNumbers = [];
    while(status && levels){
        var numUser = parseInt(prompt('Inserisci un numero compreso da 1 a 100'));
        if(!isNaN(numUser) && (numUser >= 1 && numUser <= max)){
            if(!searchElement(chosenNumbers, numUser)){
                if(searchElement(arrayNum, numUser)){
                    status = false;
                    alert('Hai perso, hai fatto esplodere la bomba');
                }else{
                    levels--;
                    chosenNumbers.push(numUser);
                    alert('Hai vinto, livelli rimanenti ' + levels);
                }
            }else{
                alert('Hai già scelto questo numero ' + numUser + ' riprova con un altro numero');
            }
        }else{
            alert('Valore errato, riprova!');
        }
    }

    if(status){
        console.log('Congratulazioni hai superato tutti i livelli, Il tuo punteggio massimo è ' + chosenNumbers.length);
    }else{
        console.log('Game Over il tuo punteggio è ' + chosenNumbers.length);
    }
} 
*/


/**
 * Esempio con l'evento al click nell'html
 * Funzione che effettua la logica del gioco
 * @param {number} max
 * @param {array} arrayNum
 * @param {number} numUser
 * @param {object} ele
 * @returns {boolean}
 */
 function logicGame(max, arrayNum, numUser, ele){
    if(numUser >= 1 && numUser <= max){
        if(!searchElement(chosenNumbers, numUser)){
            if(searchElement(arrayNum, numUser)){
                ele.className += ' bomb';
                alert('Game Over, hai fatto esplodere la bomba! Il tuo punteggio è ' + chosenNumbers.length);
                return true;
            }else{
                chosenNumbers.push(numUser);
                ele.className += ' white';
            }
        }
    }else{
        alert('Valore errato, riprova!');
    }
    
    //Controllo della vincita
    if(chosenNumbers.length === levels){
        alert('Congratulazioni hai superato tutti i livelli, Il tuo punteggio massimo è ' + chosenNumbers.length);
        return true;
    }
} 

/**
 * Funzione che crea elementi nel DOM
 * @param {number} quantity
 */
function insertionEleDom(quantity){
    //Creare elementi nel DOM
    for(var i = 0; i < quantity ; i++){
        var eleBox = document.createElement('div');
        eleBox.className = 'box';
        document.getElementById('grid').appendChild(eleBox);
    }
}

/**
 * Funzione che cerca se l'elemento esiste nell'array
 * @param {array} array 
 * @param {[string,number]} serch 
 * @returns {boolean}
 */
function searchElement(array, serch){
    for(var i = 0; i < array.length; i++){
        if(array[i] === serch){
            return true;
        }
    }
    return false;
}

/**
 * Crazione di numeri generati
 * @returns {array}
 */
function getCreateNumber(rangeMax){
    //Array contenente i 16 numeri casuali
    var itemsNum = [];
    while(itemsNum.length < 16){
        //Funzione che genera casualmente i numeri
        var randomNum = getRndInteger(1, rangeMax);
        if(!searchElement(itemsNum, randomNum)){
            itemsNum.push(randomNum);
        }
    }
    return itemsNum;
}

/**
 * Generatore di numeri casuali
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function getRndInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}