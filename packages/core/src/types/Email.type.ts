import { z } from 'zod';
import { type EmailContent } from '@aws-sdk/client-sesv2';

export interface IEmail {
	id: string;
	recipients: Array<string>;
	status: string;
	timestamp: string;
}

export const SEmail = z.object({
    to: z.array(z.string().email()),
    template: z.object({
        name: z.enum(['WELCOME']),
        data: z.object({

        }),
    }).optional(),
    content: z.object({
        subject: z.string(),
        body: z.string()
    }).optional()
});

export type TEmailConfigEntry = {
    check: (input: { template?: object; content?: object }) => boolean;
	generateDynamicPayload: (data: any) => { Content: EmailContent };
}

export type TEmailTemplate = 'WELCOME';

export interface IEmailContentPayload {

}

export interface IEmailTemplatePayload {
    name: TEmailTemplate;
    data: {}
}

export const SEmailTemplateWelcome = z.object({

});