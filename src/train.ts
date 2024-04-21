console.log("HERE! is Train Area");

//**                                                  Task - ZB
function randomBetween(num: number, num1: number) { 
  return Math.floor(Math.random() * (num1 - num)+ num); //floor butun son qivoladi 
}
console.log(randomBetween(1, 10));

//**                                                  Task - ZA
/* 
function sortByAge(sorted:any[]) {
    return  sorted.sort((minAge, maxAge) => minAge.age - maxAge.age);
}

console.log(
    sortByAge([{ age: 23 }, { age: 21 }, { age: 13 }])
);
 */
//**                                                  Task - Z
/* 
function sumEven(arr: number[]) {
  let sum = 0;
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] % 2 === 0) {
      sum += arr[index];
    }
  }
  return sum;
}
console.log("sum:", sumEven([1, 3, 4]));
 */
/*  
let arr = [1, 2, 3, 4, 54, 6, 9, 33, 7];
let sumEven1 = arr.filter(function (num) {
  return num % 2 === 0;
});
console.log(sumEven1);
output : [ 2, 4, 54, 6 ] bu function hamma juftni topadi
 */
//**                                                  Task - Y

// function findIntersection(arr:number[], arr2: number[]) {
//     const newArr = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (arr2.includes(arr[i])) {
//             newArr.push(arr[i])
//         }
//     }
//     return newArr
//     }
//     console.log("sum:",findIntersection([1,2,3], [3,2,0]));

//**                                                  Task - X

// function countOccurrences(model:any, str: string) {
//     let count = 0;
//     for (let index in model) {
//         if (typeof model[index] === 'object' ) {
//             count += countOccurrences(model[index], str);
//         } else if (index === str ){
//             count ++
//         }
//     }
//     return count
//     }
//     console.log("sum:", countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model'));

//**                                                  Task - W

// function chunkArray(arr: number[], num: number) {
//   let res = [];
//   for (let i = 0; i < arr.length; i += num) {
//     res.push(arr.slice(i, i + num));
//   }
//   return res;
// }
// console.log("sum:", chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9], 3));

//**                                                  Task - V

// function countChars(str: string) {
//   const obj: { [v: string]: number } = {};
//   for (let i = 0; i < str.length; i++) {
//     const ele: string = str[i];
//     obj[ele] === undefined ? (obj[ele] = 1) : obj[ele]++;
//   }
//   return obj;
// }
// console.log("sum:", countChars("hello"));

//**                                                  Task - U
// function sumOdds(num: number) {
//   let i = 0;
//   let count = 0;
//   while (i < num) {
//     if (i % 2 !== 0) count += 1;
//     i++;
//   }
//   return count;
// }
// console.log("sum:", sumOdds(11));

/* 
//**                                                  Task - T
function mergeSortedArray(arr2: number[], arr1: number[]) {
  const sorted = arr2.concat(arr1).sort();
  return sorted;
}
console.log(mergeSortedArray([8, 4, 2, 1], [7, 2, 5, 2]));
 */
/*  

//**                                                  Task - S
function missingNumber(arr:number[]){
    const num = arr.length + 0;
    for (let i = 0; i < num; i++) {
        if (!arr.includes(i)) {
            return i;
        }
    }
    return "barcha raqam mavjud"
}
console.log(
    missingNumber([3,2,1,0]) 
);

/* 
//**                                                  Task - R
function calculate(str:string){
    return eval(str)
}
console.log(
    calculate("1+3")
);
 */

//**                                                  Task - Q
/* 
function hasProperty(name:object, str:string){
    for (let key in name){
        if (key === str){
            return true
        }
    }
    return false
}
console.log(
    hasProperty({name: "BMW", model: "M3"}, "model")
);
 */

//**                                                  Task - P

// function objectToArray(obj:object) {
//     return Object.entries(obj)
// }
// console.log(
//  objectToArray({a: 10, b: 20}));

//**                                                  Task - O

/* 

function sumOfNumbers(num:any){
    let count = 0;

    for (let i = 0; i <= num.length;i++) {
        if (typeof num[i] == "number") count += num[i]
    }
    return count

}

const num = [10, "10", {son: 10}, true, 35]
const arrNum = sumOfNumbers(num);
console.log(arrNum);
 */
// gpt version

// function sumOfNumbers(num: any[]) {
//     return num.reduce((acc, curr) => typeof curr === "number" ? acc + curr : acc, 0);
// }

// const num = [10, "10", { son: 10 }, true, 35];
// const arrNum = sumOfNumbers(num);
// console.log(arrNum);

//**                                                  Task - N

/*
 function palindromCheck(str: string){
    const toSplit = str.replace(/\s/g, '')
    const toReverse = toSplit.split('').reverse().join('')
    const check = toSplit === toReverse
    return check
}

const palinCheck = palindromCheck("dad");
console.log(palinCheck);

 */
//**                                                  Task - M

/* 
function getSquareNumbers(num:number[] ){
    
    const square = num.map((ele ) =>{
      return { number:ele, square:ele*ele }
    })
    return square
}

const squareNumbers = getSquareNumbers([1,2,3,5]);
console.log(squareNumbers);

 */

//**                                                  Task - L

/* 
function reverseSentence(str:string) {
    const wordSentence = str.split(' ')
    console.log(typeof(wordSentence));
    const reversedWords = wordSentence.map(ele => ele.split('').reverse().join(''));
    
    const reversedWords1  = reversedWords.join(' ')
    return reversedWords1
    
}

const reversed = reverseSentence("we like codding")
console.log(reversed);
 */

//**                                                  Task - K
/* 
const vowel = 'aeiou';

const findVowels = (str:string) => {
  let foundVowels = [];
  for (let i of str) {
    if (vowel.includes(i)) {
      foundVowels.push(i);
    }
}
  return foundVowels.length;
}

const vowels = findVowels("Hey how aore you");
console.log(vowels);

 */

//**                                                  Task - J
/* 
function findLongestWorld(str : string) {
    const s = str.split(' '); //  bu  split arrayga aylantirib qoydi 
    let longest = s[0]; // sni 0chi indexi a ga tenglandi
    for (let i = 1; i < s.length ; i++) {
        if (s[i].length > longest.length) {
            longest= s[i];
        }
    }
    return longest;
}
const finded = findLongestWorld("I am verry strong");
console.log(finded); 
*/

/* 
//**                                                  Task - I


function countDigit1(str:String) {
    return str.replace(/\D/g,'').toString()
}
let input = 'sdf68675m46ksdl435kml326klm' 
const digit = countDigit1(input)
console.log(`Listda ${digit} shu raqamlar bor`);
console.log(typeof(digit))


 */

/* 
//**                                                  Task - H

const number = [9,8,1,2,-5,3,4,5,-9,6,7,8,-0,45] 


function getPositive() {
    return number.filter(ele  => ele > 0).toString()
}
const a = getPositive()
console.log("Type:",typeof(a));

 */

//*                                                  Task Sezar Cipher
/* 
const alphabet = "abcdefghijklmnopqrstuvwxyz";
let code = 9;
const message = "hello, how are you? my general";

function decodeMessage(message:string, secretcode:number) { 
    let decodedMessage = "" 
    for (let i = 0; i < message.length; i++) {
      const index = alphabet.indexOf(message[i]);
      if (index === -1){
        decodedMessage += message[i] 
    }else{
        const newIndex = (secretcode + index + alphabet.length) % alphabet.length // shunda alphabetni qaytib aylanyabti 
        decodedMessage += alphabet[newIndex] // yangi shifr messageni hosil qilyabti 
    }
 
    }
    return decodedMessage
}

const secret_msg = decodeMessage(message,code);
console.log("Secret message =>:",secret_msg);

setTimeout(() => {
    code *= -1
    const message_encoded = decodeMessage(secret_msg,code);
    console.log("Original =>:", message_encoded);
    
},5000);
 */

//**                                                  Task - G
/* 
const nums = [3,5,1,9,4,8,9,6,0]

function getHighestIndex() {
    let hightIndex = 0;
    for (let i = 0; i < nums.length; i++) {
        console.log("bu I:",i);
        console.log("index:",hightIndex);
        if (nums[i] > nums[hightIndex]) {
            // console.log(i);
            hightIndex = i
        }
    }
    return hightIndex
}
const hightIndex = getHighestIndex()
console.log("Eng baland son bu:",hightIndex,"Indexda"); 
*/

/* 
const nums = [3, 5, 1, 9, 4, 8, 9, 6, 0];

function getHighestIndex() {
    let highestIndex = 0;
    nums.forEach((num, index) => {
        if (num > nums[highestIndex]) {
            highestIndex = index;
        }
    });
    return highestIndex;
}

const highestIndex = getHighestIndex();
console.log("The index of the highest number is:", highestIndex);

 */

// Project standart

// 1 login standarts

// 2chi . naming standartds // goHome
// -Camelcase: function, method, variable
// Pascal - class
// folder -kebab case
// css - snake

// 3) error handling customaized errors error.ts

/*
Traditional api 
Rest api 
GraphQl api 
 */

/* 
traditional => frontend = BDDR => EJS
MOdern FD => SPA  

coockies
request join
self destroy

*/
/* 
validation 4 da 

frontend 
backend
databaseValidation

[serverValidation]

 */
