import { queueSendEmail } from './queues';

export const email = new sst.aws.ApiGatewayV2('Email');
email.route('GET /', {
    link: [queueSendEmail],
	handler: 'packages/functions/src/events/trigger-send-email.handler',
});
