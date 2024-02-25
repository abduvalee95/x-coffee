import mongoose,{ Schema } from "mongoose";
import { MemberType, MemberStatus } from "../lips/enum/member.enum";
/* 
Schemalar 2 hil quriladi 
1: schemadan foydalanish 
2: code based hcode usulida hosil qilish
 */

// Schema based ER modelinga amal qilgan holda Schema modellarimizni hosil qilamiz
const memberSchema = new Schema ({
   memberType: {
    type: String,
    enum: MemberType,
    default: MemberType.USER,
   },

   memberStatus: {
    type: String,
    enum: MemberStatus,
    default: MemberStatus.ACTIVE,
   },

   memberNick: {
    type: String,
    index: {unique:true, sparse:true }, // index unique bolish kk shart kiritamiz 1ta nick 1 ta insonga tegishli bolish kk db ga joylayabmiz shartni
    // db kimdir ishlatgan nickni yanakimdir yozsa db ga yozmaydi error beradi 
   required: true, // yoshilishi shart degani by default false boladi 
    },

    memberPhone: {
        type: String,
        index: {unique:true, sparse:true },
        required: true,
    },

    memberPassword: {
        type: String,
        select: false, // db olib bermasin dbdan malumot olinganda paswwordni olib berma degan manoni yozyabmiz
        required:true, // bolishi shart
    },

    memberAddress: {
        type: String,
    },

    memberDesc: {
        type: String,
    },

    memberImage: {
        type: String,
    },

    memberPoints: {
        type: Number,
        default: 0,
    },

},
 {timestamps: true} // updatedAt createdAt
)
// enum: qiymatlar aniq belgilarni iwlatishda kiritiladigon type hisoblaniladi

//! Schema Modelga aylantirish
export default mongoose.model("Model", memberSchema)
//mongooseni model degan metodi aynan bizga schema hosil qilib beradi  va uni nomini member deb kiritamiz memberSchema ni 2chi argument sifatida pass qilamiz
//instance olingan memberSchemani pass qilamiz