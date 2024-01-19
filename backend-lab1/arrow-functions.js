// Regular function
function sayHello() {
    return "Hello, world!";
}
const sayHelloArrow = () => "Hello, world!";


// Regular function
function double(x) {
    return x * 2;
}
const doubleArrow = (x) => x * 2;


// Regular function
function add(x, y) {
    return x + y;
}
const addArrow = (x, y) => x + y;

const numbers = [1, 2, 3, 4, 5];
const doubled = [];
numbers.forEach(function(num) {
  doubled.push(num * 2);
});
const numbersArrow = [1, 2, 3, 4, 5];
const doubledArrow = [];
numbers.forEach((num) => {
  doubled.push(num * 2);
});

