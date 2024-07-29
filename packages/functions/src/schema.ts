import { z } from 'zod';

export const EmailSchema = z.object({
	from: z.string().email(),
    to: z.array(z.string().email()),
    cc: z.array(z.string().email()),
    bcc: z.array(z.string().email()),
    subject: z.string(),
    content: z.string()
});