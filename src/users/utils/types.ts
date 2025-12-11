import { Application } from '../schemas/aplications.schema';
import { User } from '../schemas/user.schemas';
import { Types } from 'mongoose';

export interface UserWithApplication extends Omit<User, 'applicationId'> {
  _id: Types.ObjectId;
  applicationId: Application;
}
