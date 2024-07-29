import { Resource } from 'sst';
import { type APIGatewayEvent } from 'aws-lambda';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { EmailSchema } from '../schema';


const sqs = new SQSClient({});

export const handler = async (event: APIGatewayEvent) => {
	try {
		const body = JSON.parse(event.body || '{}');
		EmailSchema.parse(body);

		await sqs.send(
			new SendMessageCommand({
				QueueUrl: Resource.SendEmail.url,
				MessageBody: 'Hello!',
			})
		);

		return {
			statusCode: 200,
			body: 'Trigger Send Email Function',
		};
	} catch (error) {
		return {
			statusCode: 400,
			body: 'Trigger Send Email Function',
		};
	}
};
