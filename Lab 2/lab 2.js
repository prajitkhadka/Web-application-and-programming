// LAB 2 - JAVASCRIPT BASICS OVERVIEW



// =============================================
// 1. VARIABLES: var, let, const
// =============================================

var   name    = "Alice";    // OLD style — generally avoid var (function-scoped, hoisted)
let   age     = 20;         // MODERN approach — block-scoped, can be updated
const country = "Nepal";    // CONSTANT — block-scoped, cannot be reassigned

console.log("--- 1. Variables ---");
console.log("Name:", name);
console.log("Age:", age);
console.log("Country:", country);

// let allows reassignment
age = 21;
console.log("Updated age:", age);






console.log("\n--- 2. Traditional Functions ---");

// Function declaration
function greet(personName) {
  return "Hello, " + personName + "!";
}

// Function expression (assigned to a variable)
const add = function(a, b) {
  return a + b;
};

console.log(greet("Bob"));
console.log("2 + 3 =", add(2, 3));



// 3. ARROW FUNCTIONS


console.log("\n--- 3. Arrow Functions ---");

// Arrow function — concise syntax using =>
const multiply = (a, b) => a * b;

// Single parameter doesn't need parentheses
const double = x => x * 2;

// Multi-line arrow function requires { } and return
const greetArrow = (personName) => {
  const message = "Hi, " + personName + "!";
  return message;
};

console.log("3 * 4 =", multiply(3, 4));
console.log("double(7) =", double(7));
console.log(greetArrow("Charlie"));



// 4. OBJECTS

console.log("\n--- 4. Objects ---");

// Objects store related properties and methods together
const student = {
  name:    "Sita",
  age:     19,
  college: "TU",
  isActive: true,
  
  // Method inside object
  introduce: function() {
    return `I am ${this.name} and I am ${this.age} years old`;
  }
};

// Access properties using dot notation
console.log("Student name:", student.name);
console.log("Student age:", student.age);
console.log(student.introduce());

// Modify a property
student.age = 20;
console.log("Updated age:", student.age);

// Add a new property
student.gpa = 3.8;
console.log("Added GPA:", student.gpa);

// Destructuring: pull values into variables
const { name: sName, college } = student;
console.log("Destructured:", sName, "from", college);



// 5. ARRAYS + MAP


console.log("\n--- 5. Arrays + map() ---");

const numbers = [1, 2, 3, 4, 5];

// map() — applies a transformation and returns a new array
const squared = numbers.map(n => n * n);
const doubled = numbers.map(n => n * 2);

console.log("Original:", numbers);
console.log("Squared:", squared);
console.log("Doubled:", doubled);

// map with array of objects
const students = [
  { name: "Ram",   score: 85 },
  { name: "Shyam", score: 72 },
  { name: "Hari",  score: 91 },
];

const names = students.map(s => s.name);
const grades = students.map(s => ({
  name: s.name,
  grade: s.score >= 80 ? "A" : "B"
}));

console.log("Student names:", names);
console.log("Grades:", grades);


// 6. ARRAYS + FILTER

console.log("\n--- 6. Arrays + filter() ---");

// filter() — selects elements that satisfy a condition
const evens   = numbers.filter(n => n % 2 === 0);
const odds    = numbers.filter(n => n % 2 !== 0);
const bigNums = numbers.filter(n => n > 3);

console.log("Even numbers:", evens);
console.log("Odd numbers:", odds);
console.log("Numbers > 3:", bigNums);

// filter with objects
const topStudents = students.filter(s => s.score >= 80);
console.log("Top students (score >= 80):", topStudents);



// 7. SPREAD OPERATOR ( ... )

console.log("\n--- 7. Spread Operator ---");

// Spread expands arrays/objects into individual elements

// Merge arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log("Combined arrays:", combined);

// Clone an array (creates a new copy, not reference)
const copy = [...arr1];
copy.push(99);
console.log("Original arr1:", arr1);   // unchanged
console.log("Copy:", copy);

// Spread with objects
const defaults = { theme: "dark", lang: "en", fontSize: 14 };
const userPrefs = { lang: "np", fontSize: 16 };

// userPrefs overrides matching keys in defaults
const finalSettings = { ...defaults, ...userPrefs };
console.log("Final settings:", finalSettings);

// Use spread to pass array elements as arguments
const nums = [3, 1, 4, 1, 5, 9, 2];
console.log("Max:", Math.max(...nums));
console.log("Min:", Math.min(...nums));



// 8. COMBINED EXAMPLE (REAL USE CASE)


console.log("\n--- Real-world Example ---");

const products = [
  { id: 1, name: "Laptop",  price: 80000, inStock: true  },
  { id: 2, name: "Phone",   price: 35000, inStock: true  },
  { id: 3, name: "Tablet",  price: 45000, inStock: false },
  { id: 4, name: "Monitor", price: 25000, inStock: true  },
  { id: 5, name: "Headset", price: 5000,  inStock: false },
];

// Step 1: keep only available products
const inStock = products.filter(p => p.inStock);

// Step 2: apply a 10% discount
const withDiscount = inStock.map(p => ({
  ...p,
  discountedPrice: p.price * 0.9
}));

// Step 3: select items below Rs. 50,000 after discount
const affordable = withDiscount.filter(p => p.discountedPrice < 50000);

console.log("In-stock items:", inStock.map(p => p.name));
console.log("Affordable discounted items:", affordable);


console.log("\n--- 9. Bonus: forEach & reduce ---");

// forEach — executes a function for each element (no return value)
numbers.forEach(n => {
  if (n % 2 === 0) console.log(n, "is even");
});

// reduce — combines array elements into a single value
const sum = numbers.reduce((total, current) => total + current, 0);
console.log("Sum of [1,2,3,4,5]:", sum);

const totalScore = students.reduce((acc, s) => acc + s.score, 0);
console.log("Total student scores:", totalScore);
console.log("Average score:", totalScore / students.length);