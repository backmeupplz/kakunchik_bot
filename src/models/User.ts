import {
  prop,
  getModelForClass,
  mongoose,
  modelOptions,
  Severity,
} from '@typegoose/typegoose'

type PoopedObject = { [index: string]: number }

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class User {
  @prop({ required: true, index: true, unique: true })
  id: number

  @prop({ type: mongoose.Schema.Types.Mixed })
  pooped: PoopedObject
}

// Get User model
const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})

// Get or create user
export async function findUser(id: number) {
  let user = await UserModel.findOne({ id })
  if (!user) {
    try {
      user = await new UserModel({ id }).save()
    } catch (err) {
      user = await UserModel.findOne({ id })
    }
  }
  return user
}
