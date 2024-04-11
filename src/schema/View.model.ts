import mongoose, { Schema } from "mongoose";
import { ViewGroup } from "../libs/enum/view.enum";

const viewSchema = new Schema(
  {
    viewGroup: {
      type: String,
      enum: ViewGroup,
      reqoired: true,
    },

    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    viewRefId: {
      type: Schema.Types.ObjectId,
      // memberid yoki articleId qiymati ni qoyishimiz mumkun keynchalik
      required: true,
    },
  },
  { timestamps: true /* collection: "views" */ } // updatedAt createdAt
);

export default mongoose.model("View", viewSchema);
