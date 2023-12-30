import { registerAs } from '@nestjs/config';
import { env } from 'node:process';

export default registerAs('botfather', () => ({
  token: env.TELEGRAM_TOKEN_KEY ?? '',
}));
