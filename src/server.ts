import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

mongoose.connect(process.env.MONGO_URL as string, {}) //{} conection option 
.then((data) => {
    console.log("MongoDB connection succsess");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function() {
        console.info(`The server is running successfully on port: ${PORT}`);
        console.info(`Admin project on http://localhost:${PORT}/admin \n`)
    })
})

.catch((err)=>
console.log("ERROR on connection PORT",err)
)










/* 
// **                                   Typescript 
// Typescript codelirimizni Compiler qilib beradi oz vaqrida Error chiqadigon qiladi
// variableni ohiriga : va dynamic type ni korsatishimiz kk boladi
let box: string = "hello"
// box = 234,
box = "hi"

//number type
const counter: number = 243
// counter = "234" // hato int qabbul qiladi

//ham number ham string qabul qiladigonni yozadigon bolsak
let stage: number | string 
stage = "hello",
stage = 23

// boolean
let boo: true | false 
boo = true
boo = false

// object misolida interface type uchun hizmat qiladigon bir soya
interface Person {
    name: string,
    age: number,
    work: boolean,
    lastname: null;
}

const person: Person =  {
    name: 'John',
    age: 23,
    work:true,
    lastname: null,
}

// **                               array bn 

let skills: string []; // faqat string qabul qiladi
skills = ['Problem', 'solving','machine']


let skills2: (string | number)[]; // faqat string yoki number
skills2 = ['Problem', 'solving','machine', 34332]

class Person1 {
    age:number;
    name:string;
    lastname:string;
    work:boolean

    constructor(name:string,age:number,lastname:string,work:boolean) {
        this.age = age;
        this.name = name;
        this.lastname = lastname;
        this.work = work;
    }
}
// togri kiritmaguncha run bolmidi Compile error bolib turaveradi hatoni togrilamaguncha
const per = new Person1('John', 33,  'wick', false);
console.log(per);
console.log("EXUCUTED");

const count:number = 100;

import moment from 'moment';


const currentTime  = moment().format("yyyy mm dd hh:mm");
console.log(currentTime);

//**                                         Patternlar

/*  

Architectural Pattern: MVController, Dependency Injection, MVPresenter;
bu backendimizni malumot oqimini tartibga soladigon bir vosita yani arhitekturasi 

Design pattern: Middleware, Decotar; modullarni iwladishda  nest jsda 
butun bir backendni emas 
malum bir bolaklarini echshda iwlatiladigon pattern 


// interface Person {
//     name1: "dsaf"|"ksfa"|"dgsdf"|342
// }

// import moment from "moment"  //const moment require("moment")

*/
// *        IMPORT

/* 
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";


dotenv.config();
console.log("PORT",process.env.PORT);
console.log("MONGO_URL",process.env.MONGO_URL);


// ?mongoose orqali mongodbga ulanish 


mongoose.connect(process.env.MONGO_URL as string, {}) //{} conection option 
.then((data) => {
    console.log("MongoDB connection succsess");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function() {
        console.log("DONE"); // dirname qiymatni korish uchun
        console.log(`The server is running successfully on port: ${PORT}`);
        
    })
})

.catch((err)=>
    console.log("ERROR on connection PORT",err)
    
)
 */