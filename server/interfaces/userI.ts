export interface IUser extends Document {
    firstName: string;
    lastName: string;
    about: string;
    avatar: string;
    email: string;
    password: string;
    verified : boolean
    passwordResetToken: string;
    passwordResetExpires: string;
    createdAt: Date;
    updatedAt: Date;
    otp: string | undefined;
    otp_expiry_time: Date;
    correctPassword(password : string,enteredPassword : string) : Promise<boolean>
    correctOtp(otp : string | undefined,enteredOtp : string) : Promise<boolean>
  }
  