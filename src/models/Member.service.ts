// member servislarimizni classlar orqalik quramiz

import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import { MemberStatus, MemberType } from "../libs/enum/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/config";
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

    public async processLogin(input: LoginInput): Promise <Member> {
        // biznes Logic
       // member schema model orqali --
       console.log("Service login");
       
        const member = await this.memberModel
       // -- biz kiritgan member nick ni qidirmoqda
        .findOne
        ({ memberNick: input.memberNick }, // Query condition qandey malumot izlanish kk shuni kiritamiz
        { _id:0,memberNick: 1, memberPassword: 1 }
        ) //  force: majburiy cahqirish qillib passwordni ovolamiz 1 bolsa olib beradi 0 olib bermidi _id:0
        .exec();
        // agar member mavjid bolmasa ! 
         
        if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
        
        // va nickni ovodik bu natijani
        console.log("exist:",member);
        // natijani qaytarib yubordik va res.controler  resultga qaytib boryabti
        return member
        
    }
}

 */
class MemberService {

    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel; // bu class database bn operatsiyalardi qiladi 
    }
//*                                                         SPA

    public async signup(input: MemberInput): Promise <Member> { 
        const salt = await bcrypt.genSalt();
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    console.log('keldi');
    
        try {
        const result = await this.memberModel.create(input);  
        result.memberPassword = "";
        console.log('otdi');
        
        return result.toJSON()

        } catch (error) {
            console.log('eror model signup',error);
            
            throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_FOUND);
        }
    }

    public async login(input: LoginInput): Promise <Member> {
       console.log("Service login");
        const member = await this.memberModel
        .findOne (
       { memberNick: input.memberNick,
         memberStatus: {$ne:MemberStatus.DELETE } 
         },
        { memberNick: 1, memberPassword: 1, memberStatus: 1 }
        ) 
        .exec();
        if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
         else if (member.memberStatus === MemberStatus.BLOCK ){
            throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
         }

         console.log("member:",member);
         

        const isMatch = await bcrypt.compare(
            input.memberPassword,
            member.memberPassword
        );
        if (!isMatch) {
            throw new Errors(HttpCode.UNAUTHORITHED, Message.WRONG_PASSWORD)
        }
      return await this.memberModel.findById(member._id)
      .lean()
      .exec()
    }





//*                                                         SSR

    public async processSignup(input: MemberInput): Promise <Member> { 
        const exist = await this.memberModel
        .findOne({memberType:MemberType.RESTAURANT})
        .exec() // querylarni ketma ketligni yop  kop resurse emidi qoymasayam bolaveradi 
        console.log("EXIST:",exist);
             if (exist)  throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
console.log('Before');  
        console.log('process signup');
        
             const salt = await bcrypt.genSalt();
             input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
console.log('after');

        try {
        const result = await this.memberModel.create(input);  
        result.memberPassword = "";
        return result

        } catch (error) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    public async processLogin(input: LoginInput): Promise <Member> {
       console.log("Service login");
       
        const member = await this.memberModel
        .findOne (
       { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 }
        ) 
        .exec();
        if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

        const isMatch = await bcrypt.compare(
            input.memberPassword,
            member.memberPassword
        );
      
       // const isMatch =  input.memberPassword  === member.memberPassword
        if (!isMatch) {
            throw new Errors(HttpCode.UNAUTHORITHED, Message.WRONG_PASSWORD)
        }
      return await this.memberModel.findById(member._id)
      .exec()
    }


//*                                         getUsers 

public async getUsers(): Promise<Member[]> { 
   const result = await this.memberModel
   .find({ memberType: MemberType.USER })
   .exec();
   if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND)
   
   return result
}


//*                                         updateUsers 

public async updateChosenUser(input: MemberUpdateInput ): Promise<Member[]> { 
    input._id = shapeIntoMongooseObjectId(input._id)
   const result = await this.memberModel
   .findByIdAndUpdate({ _id:input._id }, input, {new: true})
   .exec();
   if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED)
   
   return result
}

}


export default MemberService;