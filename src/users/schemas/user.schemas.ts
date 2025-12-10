import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  isActive: boolean;
  applicationId: string;
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
