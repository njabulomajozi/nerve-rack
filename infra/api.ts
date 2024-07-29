import { queueSendEmail } from './queues';

export const email = new sst.aws.ApiGatewayV2('Email');
email.route('POST /', {
    link: [queueSendEmail],
	handler: 'packages/functions/src/events/trigger-send-email.handler',
});
