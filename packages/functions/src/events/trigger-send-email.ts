import { Resource } from "sst";

import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient({});

export const handler = async () => {
	try {
		await sqs.send(new SendMessageCommand({
			QueueUrl: Resource.SendEmail.url,
			MessageBody: "Hello!"
		}));

		return {
			statusCode: 200,
			body: 'Trigger Send Email Function',
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: 'Trigger Send Email Function',
		};
	}
};
