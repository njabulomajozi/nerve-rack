const email = new sst.aws.Email('Email', {
	sender: process.env.INFRA_COMMUNICATION_EMAIL_SENDER!
});

export {
	email,
};
