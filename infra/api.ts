import { email } from "./communication";

const communicationApi = new sst.aws.ApiGatewayV2('Communication');
communicationApi.route('POST /communication/send/email', {
    link: [email],
	handler: 'packages/functions/src/events/communication.triggerSendEmailHandler',
});

export {
    communicationApi as communication
}