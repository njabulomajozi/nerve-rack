import { CreateEmailTemplateCommand, SESv2Client } from '@aws-sdk/client-sesv2';
import { type APIGatewayEvent } from 'aws-lambda';
import { Types } from '@nerve-rack/core';

export const createTemplateHandler = async (event: APIGatewayEvent) => {
	try {
		const body = JSON.parse(event.body || '{}');
		console.log({
			body
		});
		const { error, data } = Types.SCreateEmailTemplate.safeParse(body);

		if (error) {
			return { statusCode: 400, body: 'Invalid Input' };
		}

		const { name, subject, htmlBody } = data;

		console.log({
			name,
			subject,
			htmlBody
		});

		const createTemplateCommand = new CreateEmailTemplateCommand({
			TemplateName: name,
			TemplateContent: {
				Subject: subject,
				Html: htmlBody
			},
		});

		const createTemplateRes = await new SESv2Client().send(createTemplateCommand);

		return {
			statusCode: 200,
			body: JSON.stringify({ requestId: createTemplateRes.$metadata.requestId }),
		};
	} catch (error) {
		console.error(error);
		return { statusCode: 500, body: JSON.stringify({ message: 'Failed to create an email template' }) };
	}
};