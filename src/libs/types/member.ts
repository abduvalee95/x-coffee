import { ObjectId } from 'mongoose'
import { MemberStatus, MemberType } from "../enum/member.enum";

export interface MemberInput {
    _id : ObjectId;
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberNick : String;
    memberPhone : String;
    memberPassword : String;
    memberAddre? : String;
    memberDesc?  : String;
    memberImage? : String;
    memberPoints? : Number;
}

// qaytyatgan document uchun yangi interface hosil qilamiz
// databasedan qaytayotgan malumot uchun biriktirilgan type
export interface Member {
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberçNick : String;
    memberPhone : String;
    memberPassword? : String; //yashirdik
    memberAddre? : String;
    memberDesc?  : String;
    memberImage? : String;
    memberPoints : Number; 
    createdAt: Date;
    updatedAt: Date;
}


export interface LoginInput {
    memberNick : string;
    memberPassword : string;
}