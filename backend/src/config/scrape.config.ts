import { registerAs } from '@nestjs/config';

export default registerAs('scrape', () => ({
  delayMs: 2000,
  maxRetries: 3,
}));
