function game() {
  var array = ''; // array to be guessed by player`
  var input = ''; // player's input
  var difficulty = 4; // amount of numbers to guess
  var bulls = 0;
  var cows = 0;
  var win = false;

  // Array setter
  function setArray(n) {
    array += 1927; //sample array for testing
                   //Не успел доделать вариант, где число генерировалось бы случайно
    // for (var i = 0; i < n; i++) {
    //   array += Math.round(Math.random()*9);
    // }
    // alert('Array is: ' + array);
  }
  function inputChecker() {
    //Validation
    function invalidInput () {
      var err = !(input.length == array.length); // Checking if input and array are same length
      if (!err) {
        for (var i = 0; i < input.length; i++) {
          //check if not a digit!!! if (notDigit)
          if (isNaN(input[i])) {err = true; alert('Error: You should enter only numbers!'); break;}
          // check for same numbers: compare all numbers of input to the i-th number
          for (var j = 0; j < input.length; j++) {
            if (input[i] == input[j] && i != j) {err = true; alert('Error: numbers should be different!'); break}
          }
          if(err) {break;}
        }
      }
      alert('Error: ' + err);
      return err;
    }
    function checkInput (arr, inpt) {
      for (var i = 0; i < inpt.length; i++) {
        var check = arr.indexOf(inpt[i], 0);
        switch (check) {
          case i:
            bulls++;
            break;
          case -1:
            break;
          default:
            cows++;
        }
        // var isBull = (inpt[i] == arr[i]);
        // bulls += isBull;
        // var cow = !isBull * (arr.indexof(inpt[i]));
      }
    }
    this.callCheck = function() { //a method that helps to use this module
      alert('Check is called');
      if (!invalidInput()) {
        var go = checkInput(array, input);
        return [bulls, cows];
      }
      else {
        return -1;
      }
    }

  }

  this.start = function () {
    setArray(difficulty);
    bulls = 0;
    cows = 0;
  }
  this.setInput = function(str) {
    input = str;
  }
  this.state = function() {
    var b = bulls;
    var c = cows;

    switch (bulls) {
      case 4:
        win = true;
        break;
      default:
        bulls = 0;
        cows = 0;
    }
    return [b, c, win, input];
  }

  this.checker = new inputChecker();
}

//User interface class
function usrInterface() {
  var hi = 'Hi! This is the "Bulls and Cows" game.';
  var rules = '';
  var proceed = 'Press "OK" to start new game';
  var congrat = 'Congratulations! You win!';

  this.start = function () {
    alert( hi + '\n\nRules:' + rules + '\n\n' + proceed);
  }
  this.ask = function() {
    return prompt("Please, type your guess here", '');
  }
  this.tell = function(arr) {
    alert('Bulls: ' + arr[0] + '\nCows: ' + arr[1]);
  }
  this.finish = function () {
    alert (congrat);
  };
}

//Game start
var ui = new usrInterface();
var Game = new game();
var state;

ui.start();
Game.start();

//Main loop
while(1) {
  Game.setInput(ui.ask());
  Game.checker.callCheck();
  state = Game.state();
  ui.tell(state);
  if (state[2]) {break;}
}
ui.finish();
