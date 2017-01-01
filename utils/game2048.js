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
const GAME_1DARRAY_LENGTH = 4;
const GAME_ARRAY_LENGTH = 16;
// game array value
const GAME_AVAILABLE_VALUE = [0,2,4,8,16,32,64,128,512,1024,4096,9192];
// game random value to create number in array
const GAME_PRIMITIVE_VALUE = [2,4];
// game move direction
const GAME_MOVE_DIRECTION = ["moveLeft", "moveRight", "moveTop", "moveButtom"];
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
// game reset game array
function resetGameArray() {
    gameArray.fill(0);
    console.log("resetGameArray gameArray value: ", gameArray);
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
    if (!Array.isArray(array) ||
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
// merge game 1D-array move, change 1D-array to next state, merge from array tail to head
function merge1DArray(array) {
    // console.log("merge1DArray", array);
    var newArray = [];
    if (!Array.isArray(array))
        return newArray;
    var length = array.length;
    if (length == 0)
        return newArray;
    // push element
    var arrayIndex = 0;
    while (arrayIndex < length - 1) {
        if (array[arrayIndex] == 0) {
            arrayIndex++;
        } else if (array[arrayIndex] == array[arrayIndex + 1]) {
            newArray.push(2 * array[arrayIndex]);
            arrayIndex += 2;
        } else {
            newArray.push(array[arrayIndex]);
            arrayIndex++;
        }
    }
    // last element
    while (arrayIndex < length) {
        newArray.push(array[arrayIndex]);
        arrayIndex++;
    }
    // filled with zero
    var zeroCount = length - newArray.length;
    while (zeroCount--) {
        newArray.push(0);
    }
    // console.log("merge1DArray", newArray);
    return newArray;
}
// merge game 1D-array move, change 1D-array to next state
function mergeGameLine(array, direction) {
    if (!Array.isArray(array) || GAME_MOVE_DIRECTION.indexOf(direction) == -1) {
        return [];
    }
    if (direction == "moveLeft" || direction == "moveTop") {
        return merge1DArray(array);
    } else {// if (direction == "moveRight" || direction == "moveButtom")
        var reverseArray = array.slice();
        reverseArray.reverse();
        return ((merge1DArray(reverseArray)).reverse());
    }
}
// merge game array when move by direction
function mergeGameArray(direction) {
    if (GAME_MOVE_DIRECTION.indexOf(direction) == -1) {
        return false;
    }
    var newArray = [];
    if (direction == "moveRight" || direction == "moveLeft") {
        for (var count = 0; count < GAME_1DARRAY_LENGTH; count++) {
            var array = gameArray.filter(function(value, index, array) {
                return index >= count * GAME_1DARRAY_LENGTH &&
                    index < (count + 1) * GAME_1DARRAY_LENGTH;
            });
            var mergearray = mergeGameLine(array, direction);
            newArray.push(...mergearray);
            console.log("old array list", array);
            console.log("new array list", mergeGameLine(array, direction));
        }
    } else { //if (direction == "moveTop" || direction == "moveButtom") {
        var tempArray = [];
        for (var count = 0; count < GAME_1DARRAY_LENGTH; count++) {
            var array = gameArray.filter(function(value, index, array) {
                return index % GAME_1DARRAY_LENGTH == count;
            });
            var mergearray = mergeGameLine(array, direction);
            tempArray.push(...mergearray);
            console.log("old array list", array);
        }
        for (var count = 0; count < GAME_1DARRAY_LENGTH; count++) {
            var array = tempArray.filter(function(value, index, array) {
                return index % GAME_1DARRAY_LENGTH == count;
            });
            newArray.push(...array);
            console.log("new array list", array);
        }
    }
    gameArray = newArray.slice();
    return true;
}
// diplay for debug
function displaygameArray() {
    console.log("2048 array display start");
    for (var count = 0; count < GAME_1DARRAY_LENGTH; count++) {
        var array = gameArray.filter(function(value, index, array) {
            return index >= count * GAME_1DARRAY_LENGTH &&
                index < (count + 1) * GAME_1DARRAY_LENGTH;
        });
        console.log("array list", array);
    }
    console.log("2048 array display end");
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
    // test merge function
    merge1DArray([4,3,2,5,4,6,6,7,8,1,5,2,3,3]);
    var testarray = [0,3,3,4,5,3,3,6,6,6,7,0,0,0];
    var outarray = mergeGameLine(testarray, "right");
    console.log("mergeGameLine: ", outarray);
    console.log("test moveRight:");
    setGameArray([0,0,2,2,4,4,8,8,16,32,32,0,16,0,0,0]);
    displaygameArray();
    mergeGameArray("moveRight");
    displaygameArray();

    console.log("test moveLeft:");
    setGameArray([0,0,2,2,4,4,8,8,16,32,32,0,16,0,0,0]);
    displaygameArray();
    mergeGameArray("moveLeft");
    displaygameArray();

    console.log("test moveTop:");
    setGameArray([0,0,2,2,4,4,8,8,16,32,32,0,16,0,0,0]);
    displaygameArray();
    mergeGameArray("moveTop");
    displaygameArray();

    console.log("test moveButtom:");
    setGameArray([0,0,2,2,4,4,8,8,16,32,32,0,16,0,0,0]);
    displaygameArray();
    mergeGameArray("moveButtom");
    displaygameArray();
}
module.exports = {
    printAuthor: printAuthor,
    getGameArray: getGameArray,
    setGameArray: setGameArray,
    checkGameStaus: checkGameStaus,
    testModule: testModule
}