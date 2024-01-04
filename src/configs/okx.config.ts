import { registerAs } from '@nestjs/config';
import { env } from 'node:process';

export default registerAs('tokenticker', () => ({
  token: env.OKX_TICKER ?? '',
  proxy: env.USE_PROXY ?? true
}));
