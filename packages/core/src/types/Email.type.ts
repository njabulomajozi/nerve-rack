import { z } from 'zod';

export const SEmail = z.object({
	from: z.string().email(),
    to: z.array(z.string().email()),
    cc: z.array(z.string().email()).optional(),
    bcc: z.array(z.string().email()).optional(),
    subject: z.string(),
    content: z.string()
});