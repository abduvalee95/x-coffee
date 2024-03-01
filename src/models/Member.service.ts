// member servislarimizni classlar orqalik quramiz

import MemberModel from "../schema/Member.model";
import { Member, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enum/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
// * memberSchema modeldi member.service modulga chaqirvolamiz
// MemberServis: Member.controler Restauran.controlerlarga birdek hizmat qiladi
/*
 class MemberService {

    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel; // bu class database bn operatsiyalardi qiladi 
    }

    public async processSignup(input: MemberInput): Promise <Member> { // nomini controllerni nomi bn birhil ataladi doim
        const result = await this.memberModel.create(input);  // create degan static methodi mavjud inputni pass qilib meminputni buraak restar borib hosil qilib javobni qaytaradi
        const exist = await this.memberModel.findOne({memberType:MemberType})

        // classdan instance olish uchun databasega malumot yozamz
        // const tempResult = new this.memberModel(input);  // classni constructga inputni pass qilyabmiz
        // new degani inctanse yani classdan yangi object hosil qiladi 
        // const result = await tempResult.save();

        result.memberPassword = '' // passwordni olib bermasin 

        return result
    }
}

 */
class MemberService {

    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel; // bu class database bn operatsiyalardi qiladi 
    }

    public async processSignup(input: MemberInput): Promise <Member> { 
        const exist = await this.memberModel
        .findOne({memberType:MemberType.RESTAURANT})
        .exec() // querylarni ketma ketligni yop  kop resurse emidi qoymasayam bolaveradi 
        console.log("EXIST:",exist);
        
             if (exist)  throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
           
        try {
        const result = await this.memberModel.create(input);  
        result.memberPassword = "";
        return result

        } catch (error) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }
}

export default MemberService;