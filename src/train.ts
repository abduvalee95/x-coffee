console.log("This is Train Area");

//**                                                  Task - G

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