console.log("This is Train Area");

//**                                                  Task - K

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
*/