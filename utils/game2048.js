// author information
const AUTHOR = 'chenxilinsdney';
const EMAIL = 'chenxilinsidney@gmail.com';
// print author information function. just for module test
function printAuthor(){
    console.log("game2048 author: " + AUTHOR);
    console.log("game2048 author email: " + EMAIL);
}

// const value
// game array value
const GAME_AVAILABLE_VALUE = [0,2,4,8,16,32,64,128,512,1024,4096,9192];
// game random value to create number in array
const GAME_PRIMITIVE_VALUE = [2,4];
// game move direction
const GAME_MOVE_DIRECTION = ["left", "right", "top", "bottom"];
// game status
const GAME_STATUS = ["start", "playing", "end"];
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

}
// game get game array
function getGameArray() {
    
}
// get game score the maximum value in game array
function getGameScore() {
    
}
// generate game random value in game array
function generateGameValue() {

}
// game status detect
function checkGameStaus() {

}
// game array ilegal detect
function checkArrayLegal() {

}
// merge game line move
function mergeGameLine(list, direction) {

}
// merge game array when move by direction
function mergeGameArray(direction) {

}
// unit test
function testModule() {
    // test setting data
}
module.exports = {
    printAuthor: printAuthor,
    getGameArray: getGameArray,
    setGameArray: setGameArray,
    checkGameStaus: checkGameStaus,
    testModule: testModule
}