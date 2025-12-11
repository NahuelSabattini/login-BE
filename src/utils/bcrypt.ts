import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, await bcrypt.genSalt());

export const matchPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => await bcrypt.compare(password, hashedPassword);
