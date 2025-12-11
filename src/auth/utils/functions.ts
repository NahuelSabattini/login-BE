import { ConfigService } from '@nestjs/config';
import { MAPPED_JWT_VARIABLES } from 'src/configuration/configuration-jwt';

export const configurationUseFactory = (configService: ConfigService) => {
  const expiresIn = configService.get<string>('jwt.JWT_EXPIRES_IN') || '7d';
  return {
    global: true,
    secret: configService.get<string>(MAPPED_JWT_VARIABLES.JWT_SECRET),
    signOptions: {
      expiresIn: expiresIn as `${number}h` | `${number}d`,
    },
  };
};
