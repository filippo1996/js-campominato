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

//Creiamo l'array contenente i 16 numeri generati da 1 a difficulty (default 100)
console.log(getCreateNumber(difficulty));

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