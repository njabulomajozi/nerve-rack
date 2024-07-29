const queueSendEmail = new sst.aws.Queue("SendEmail");
queueSendEmail.subscribe('packages/functions/src/queue/send-email.handler');

export {
    queueSendEmail
};
