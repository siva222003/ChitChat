import { FilterQuery, Types } from "mongoose";
import { DbService } from "../db/conn";
import { IUser } from "../interfaces/userI";

export class UserRepository {
  constructor(private readonly _db: DbService) {}

  async createUser(userObj: {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
  }) {
    return await this._db.userModel.create(userObj);
  }

  async getUserById(id: Types.ObjectId): Promise<IUser | null> {
    return await this._db.userModel.findById(id);
  }

  async getUser(query: FilterQuery<IUser>): Promise<IUser | null> {
    return await this._db.userModel.findOne(query);
  }

  updateUserById(id: Types.ObjectId, modifyObj: Partial<IUser>): Promise<IUser | null> {
    return this._db.userModel.findByIdAndUpdate(id, modifyObj, {
      new: true,
      validateModifiedOnly: true,
    });
  }

  updateUserByEmail(email: string, modifyObj: Partial<IUser>): Promise<IUser | null> {
    /*
        validateModifiedOnly -> If u have any validations set in the mongoose model
                                then those validators run for only to the properties those who are changing if u set this option to true
    */
    return this._db.userModel.findOneAndUpdate({ email }, modifyObj, {
      new: true,
      validateModifiedOnly: true,
    });
  }
}
