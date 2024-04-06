import { ObjectId } from 'mongoose'
import { MemberStatus, MemberType } from "../enum/member.enum";
import { Request } from 'express';
import { Session } from 'express-session';

export interface MemberInput {
    _id : ObjectId;
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberNick : string;
    memberPhone : string;
    memberPassword : string;
    memberAddre? : string;
    memberDesc?  : string;
    memberImage? : string;
    memberPoints? : Number;
}


export interface Member {
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberNick : string;
    memberPhone : string;
    memberPassword? : string; //yashirdik
    memberAddre? : string;
    memberDesc?  : string;
    memberImage? : string;
    memberPoints : Number; 
    createdAt: Date;
    updatedAt: Date;
}


export interface LoginInput {
    memberNick : string;
    memberPassword : string;
}

export interface MemberUpdateInput {
    _id : ObjectId;
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberNick? : string;
    memberPhone? : string;
    memberPassword? : string;
    memberAddre? : string;
    memberDesc?  : string;
    memberImage? : string;
    memberPoints : Number;
}


export interface ExtendedRequest extends Request {
    member: Member;    
    file: Express.Multer.File;
    files: Express.Multer.File[];

}

export interface AdminRequest extends Request {
    member : Member;    
    session: Session &{ member:Member }; // sessionni ichida member typimiz bor deb korsatib olamiz
    file: Express.Multer.File;
    files: Express.Multer.File[];

}



