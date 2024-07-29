import { SQSEvent } from "aws-lambda";

export const handler = async (event: SQSEvent) => {
	try {
		return {
			statusCode: 200,
			body: 'Send Email Function',
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: 'Send Email Function',
		};
	}
};
