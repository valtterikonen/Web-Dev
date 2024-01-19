// 1.
function cube(x) {
    return x * x * x;
  }
// 1. Expression
const cube = function(x) {
    return x * x * x;
}


// 2.
function fullName(first, last) {
    return first + " " + last;
  }
// 2. Expression
const fullname = function(first, last) {
    return first + " " + last;
}


// 3.
function power(base, exp) {
    if (exp === 0) {
      return 1;
    }
    return base * power(base, exp - 1);
  }
// 3. Expression
const power = function(base, exp){
  return exp === 0 ? 1 : base * power(base, exp -1 );
};


// 4.
function sumCubes(numbers) {
  var total = 0;
  for (var i = 0; i < numbers.length; i++) {
    total = total + cube(numbers[i]);
  }
  return total;
}
// 4. Expression
const sumCubes = function(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.lenght; i++) {
    total = total + cube(numbers[i]);
  }
  return total;
};


//Exercise #2

// 1. With "var" it only calls the declaration but not the assigment.

// 2. message is not defined at the point of the call.

// 3. Error because "showMessage" isn't defined at the time of the call.

// 4. Function is hoisted before its declaration. 


//Exercise #3

// 1.
for(var i = 0; i < values.length; i++){
  console.log(values[i]);
}

var values = [10, 20, 30];
// 1. Correction
var values = [10, 20, 30];

for(var i = 0; i < values.length; i++){
  console.log(values[i]);
}

// 2.
console.log(welcome('Charlie', 'Munger'));

function welcome(first, last) {
  return `Welcome, ${first} ${last}! You last logged in on ${lastLogin}.`
};

var lastLogin = '1/1/1970';
// 2. Correction
var lastLogin = '1/1/1970';

console.log(welcome('Charlie', 'Munger'));

function welcome(first, last) {
  return `Welcome, ${first} ${last}! You last logged in on ${lastLogin}.`
};
