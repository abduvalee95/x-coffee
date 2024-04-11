import Errors, { HttpCode, Message } from "../libs/Errors";
import { View, ViewInput } from "../libs/types/view";
import ViewModel from "../schema/View.model";

class ViewService {
    private readonly viewModel;

    constructor() {
        this.viewModel = ViewModel;
    }

    //Tomosha qilmoqchi bolgan user tomosha qilmoqchi bolgan targetni oldin korganmi degan mantiq
    public async checkViewExistance(input: ViewInput): Promise<View> {
        return await this.viewModel
            .findOne({ memberId: input.memberId, viewRefId: input.viewRefId })
            // ViewInputdagi olgan malumotlarimizni View Collectionni ichidan viewScheme.modelimiz orqali topishga harakat qilyabmiz
            .exec();
    }
  
    public async insertMemberView(input: ViewInput): Promise<View> {
       try {
           return await this.viewModel.create(input);
        
       } catch (error) {
        console.log("Error, model: inseringMemberView",error);
        throw new Errors(HttpCode.BAD_REQUEST,Message.CREATE_FAILED)
       }
    }
}

export default ViewService;
