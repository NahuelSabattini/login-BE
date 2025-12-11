import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'applications' })
export class Application extends Document {
  @Prop({ default: '' })
  url: string;
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
