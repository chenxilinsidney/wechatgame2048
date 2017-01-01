// author information
const AUTHOR = 'chenxilinsdney';
const EMAIL = 'chenxilinsidney@gmail.com';
// print author information function. just for module test
function printAuthor(){
    console.log("game2048 author: " + AUTHOR);
    console.log("game2048 author email: " + EMAIL);
}

// const value
// game array length
const GAME_ARRAY_LENGTH = 16;
// game array value
const GAME_AVAILABLE_VALUE = [0,2,4,8,16,32,64,128,512,1024,4096,9192];
// game random value to create number in array
const GAME_PRIMITIVE_VALUE = [2,4];
// game move direction
const GAME_MOVE_DIRECTION = ["left", "right", "top", "bottom"];
// game status
const GAME_STATUS = ["playing", "end"];
// game award
const GAME_AWARD= ["2048", "4096"];

// var value
// game array from left to right then top to buttom
var gameArray = new Array(16);
// game score
var gameScore = 0;
// game status
var gameStatus = "start";

// game set game array
function setGameArray(array) {
    if (!checkArrayLegal(array))
        return false;
    gameArray = array.slice();
    console.log("setGameArray gameArray value: ", gameArray);
    return true;
}
// game get game array
function getGameArray() {
    console.log("getGameArray gameArray value: ", gameArray);
    return gameArray;
}
// get game score the maximum value in game array
function getGameScore() {
    gameScore = Math.max(...gameArray);
    console.log("gameScore: ", gameScore);
    return gameScore;
}
// generate game random value in game array
function generateGameValue() {
    console.log("gameArray value: ", gameArray);
    //get random primitive value
    var random = Math.random();
    var randomPrimitiveIndex = Math.floor(random * GAME_PRIMITIVE_VALUE.length);
    var randomPrimitiveValue = GAME_PRIMITIVE_VALUE[randomPrimitiveIndex];
    console.log("randomPrimitiveValue value: ", randomPrimitiveValue);
    //get random index
    var zeroArrayLength = gameArray.filter(function(value, index, array) {
        if (value == 0)
            return true;
        else
            return false;
    }).length;
    // no need to generate
    if (zeroArrayLength == 0)
        return false;
    // change right value with correct index
    random = Math.random();
    var randomZeroIndex = Math.floor(random * zeroArrayLength);
    console.log("randomZeroIndex value: ", randomZeroIndex);
    var zeroCount = 0;
    gameArray.forEach(function(currentValue,index,array){
        if (currentValue == 0) {
            zeroCount++;
            if (zeroCount == randomZeroIndex + 1) {
                array[index] = randomPrimitiveValue;
            }
        }
    });
    console.log("gameArray value: ", gameArray);
    return true;
}
// game status detect
function checkGameStaus() {
    var fullArray = gameArray.some(function (element, index, array) {
        return element == 0;
    });
    if (fullArray == true) {
        gameStatus = GAME_STATUS[1];
    } else {
        gameStatus = GAME_STATUS[0];
    }
    return gameStatus;
}
// game array ilegal detect
function checkArrayLegal(array) {
    if (Array.isArray(array) == false ||
        array.length != GAME_ARRAY_LENGTH)
        return false;
    var existInvalidValue = array.some(function (element, index, array) {
        if (!Number.isInteger(element) ||
            GAME_AVAILABLE_VALUE.indexOf(element) == -1)
            return true;
        return false;
    });
    if (existInvalidValue == true)
        return false;
    return true;
}
// merge game line move
function mergeGameLine(list, direction) {

}
// merge game array when move by direction
function mergeGameArray(direction) {

}
// unit test
function testModule() {
    // test setting and getting function
    console.log("GAME_STATUS value: ", GAME_STATUS);
    var setarray = [2,2,2,2,2,2,2,2,4,0,0,0,0,0,0,0];
    console.log("setarray value: ", setarray);
    if(!setGameArray(setarray))
        return;
    var getarray = getGameArray();
    console.log("getarray value: ", getarray);
    // test check function
    console.log("checkArrayLegal: ", checkArrayLegal());
    getGameScore();
    generateGameValue();
}
module.exports = {
    printAuthor: printAuthor,
    getGameArray: getGameArray,
    setGameArray: setGameArray,
    checkGameStaus: checkGameStaus,
    testModule: testModule
}