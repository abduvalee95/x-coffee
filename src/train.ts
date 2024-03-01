console.log("This is Train Area");

//**                                                  Task - H
const number = [9,8,1,2,-5,3,4,5,-9,6,7,8,-0,45] 


function getPositive() {
    return number.filter(ele  => ele > 0).toString()
}
const a = getPositive()
console.log("Type:",typeof(a));



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