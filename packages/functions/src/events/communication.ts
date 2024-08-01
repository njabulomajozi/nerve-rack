import { Resource } from 'sst';
import { type APIGatewayEvent } from 'aws-lambda';
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { Types } from '@nerve-rack/core';

const client = new SESv2Client();

export const triggerSendEmailHandler = async (event: APIGatewayEvent) => {
	try {
		const body = JSON.parse(event.body || '{}');
		const {
			subject,
			content,
			to
		} = Types.SEmail.parse(body);

		const emailRes = await client.send(
			new SendEmailCommand({
			  FromEmailAddress: Resource.Email.sender,
			  Destination: {
				ToAddresses: to,
			  },
			  Content: {
				Simple: {
				  Subject: {
					Data: subject,
				  },
				  Body: {
					Text: {
					  Data: content,
					},
				  },
				},
			  },
			})
		  );

		return {
			statusCode: 200,
			body: JSON.stringify({
				requestId: emailRes.$metadata.requestId,
				messageId: emailRes.MessageId
			}),
		};
	} catch (error) {
		return {
			statusCode: 400,
			body: 'Trigger Send Email Function',
		};
	}
};