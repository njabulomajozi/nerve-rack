import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { type APIGatewayEvent } from 'aws-lambda';
import { Resource } from 'sst';
import { Types } from '@nerve-rack/core';

const configs: Record<string, Types.TEmailConfigEntry> = {
	content: {
		check: ({ content }) => !!(typeof content !== 'undefined' && Object.keys(content).length),
		generateDynamicPayload: ({ subject, body }: { subject: string; body: string }) => ({
			Content: {
				Simple: {
					Subject: { Data: subject },
					Body: { Text: { Data: body } },
				},
			},
		}),
	},
	template: {
		check: ({ template }) => !!(typeof template !== 'undefined' && Object.keys(template).length),
		generateDynamicPayload: (dynamicData: Types.IEmailTemplatePayload) => {
			if (!templateInputVerifier[dynamicData.name]?.validTemplateInput(dynamicData.data)) {
				throw new Error('Invalid Template input');
			}
			return {
				Content: {
					Template: {
						TemplateName: dynamicData.name,
						TemplateData: JSON.stringify(dynamicData.data),
					},
				},
			};
		},
	},
};

const templateInputVerifier = {
	WELCOME: {
		validTemplateInput: (templateData: object) => !Types.SEmailTemplateWelcome.safeParse(templateData).error,
	},
};

export const triggerSendEmailHandler = async (event: APIGatewayEvent) => {
	try {
		const body = JSON.parse(event.body || '{}');
        const { error, data } = Types.SEmail.safeParse(body);

		if (error) {
			return { statusCode: 400, body: 'Invalid Input' };
		}

		const { to, template, content } = data;

		const currentConfig = Object.values(configs).find(c => c.check({ template, content }));
		if (!currentConfig) {
			return { statusCode: 400, body: 'Missing Content/Template payload' };
		}

		const payload = currentConfig.generateDynamicPayload(template || content);
		const emailRes = await new SESv2Client().send(new SendEmailCommand({
			FromEmailAddress: Resource.Email.sender,
			Destination: { ToAddresses: to },
			Content: payload.Content,
		}));

		return {
			statusCode: 200,
			body: JSON.stringify({ requestId: emailRes.$metadata.requestId, messageId: emailRes.MessageId }),
		};
	} catch (error) {
		console.error(error);
		return { statusCode: 500, body: JSON.stringify({ message: 'Failed to send email' }) };
	}
};