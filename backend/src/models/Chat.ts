import { Schema, model, Document, Types } from "mongoose";

interface IChat extends Document {
  participants: Types.ObjectId[];
  lastMessage?: Types.ObjectId;
  type: "private" | "group";
  name?: string;
}

const chatSchema = new Schema()<IChat>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    type: {
      type: String,
      enum: ["private", "group"],
      default: "private",
    },
    name: {
      type: String,
      required: function (this: IChat) {
        return this.type === "group";
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Chat = model<IChat>("Chat", chatSchema);

export default Chat;
