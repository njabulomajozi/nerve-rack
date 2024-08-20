import { email } from './communication';

const createTemplateRole = new aws.iam.Role('EmailsCreateTemplateRole', {
	name: `${$app.name}-${$app.stage}-Role-EmailsCreateTemplate`,
	assumeRolePolicy: JSON.stringify({
		Version: '2012-10-17',
		Statement: [
			{
				Effect: 'Allow',
				Principal: {
					Service: 'lambda.amazonaws.com',
				},
				Action: 'sts:AssumeRole',
			},
		],
	}),
});

const createTemplateLambdaRoleSESPolicy = new aws.iam.Policy(
	'EmailsCreateTemplateSESPolicy',
	{
		name: `${$app.name}-${$app.stage}-SESPolicy-EmailsCreateTemplate`,
		policy: JSON.stringify({
			Version: '2012-10-17',
			Statement: [
				{
					Effect: 'Allow',
					Action: [
						'logs:CreateLogGroup',
						'logs:CreateLogStream',
						'logs:PutLogEvents',
					],
					Resource: ['*'],
				},
				{
					Effect: 'Allow',
					Action: 'iot:*',
					Resource: ['*'],
				},
				{
					Effect: 'Allow',
					Action: 'ses:*',
					Resource: ['*'],
				},
			],
		}),
	}
);

const sendEmailRole = new aws.iam.Role('SendEmailRole', {
	name: `${$app.name}-${$app.stage}-Role-SendEmail`,
	assumeRolePolicy: JSON.stringify({
		Version: '2012-10-17',
		Statement: [
			{
				Effect: 'Allow',
				Principal: {
					Service: 'lambda.amazonaws.com',
				},
				Action: 'sts:AssumeRole',
			},
		],
	}),
});

const sendEmailLambdaRoleSESPolicy = new aws.iam.Policy('SendEmailSESPolicy', {
	name: `${$app.name}-${$app.stage}-SESPolicy-SendEmail`,
	policy: JSON.stringify({
		Version: '2012-10-17',
		Statement: [
			{
				Effect: 'Allow',
				Action: [
					'logs:CreateLogGroup',
					'logs:CreateLogStream',
					'logs:PutLogEvents',
				],
				Resource: ['*'],
			},
			{
				Effect: 'Allow',
				Action: 'iot:*',
				Resource: ['*'],
			},
			{
				Effect: 'Allow',
				Action: ['pinpoint:*'],
				Resource: ['*'],
			},
			{
				Effect: 'Allow',
				Action: 'ses:*',
				Resource: ['*'],
			},
		],
	}),
});

export const communication = $resolve([
	createTemplateRole.arn,
	createTemplateRole.name,
	createTemplateLambdaRoleSESPolicy.arn,
	sendEmailRole.arn,
	sendEmailRole.name,
	sendEmailLambdaRoleSESPolicy.arn,
]).apply(
	([
		createEmailTemplateLambdaRoleARN,
		createEmailTemplateLambdaRoleNAME,
		createEmailTemplateLambdaRoleLambdaPolicyARN,
		sendEmailLambdaRoleARN,
		sendEmailLambdaRoleNAME,
		sendEmailLambdaRoleLambdaPolicyARN,
	]) => {
		const createEmailTemplateRolePolicy = new aws.iam.RolePolicyAttachment(
			'createEmailTemplateRolePolicyAttachment',
			{
				role: createEmailTemplateLambdaRoleNAME,
				policyArn: createEmailTemplateLambdaRoleLambdaPolicyARN,
			}
		);

		const sendEmailRolePolicy = new aws.iam.RolePolicyAttachment(
			'sendEmailRolePolicyAttachment',
			{
				role: sendEmailLambdaRoleNAME,
				policyArn: sendEmailLambdaRoleLambdaPolicyARN,
			}
		);

		return $resolve([
			createEmailTemplateRolePolicy,
			sendEmailRolePolicy,
		]).apply(([]) => {
			const communicationApi = new sst.aws.ApiGatewayV2('Communication');

			communicationApi.route('POST /actions/email/create-template', {
				name: `${$app.name}-${$app.stage}-EmailsCreateTemplate`,
				handler:
					'packages/functions/src/actions/email.createTemplateHandler',
				role: createEmailTemplateLambdaRoleARN,
			});

			communicationApi.route('POST /events/email/trigger', {
				name: `${$app.name}-${$app.stage}-EmailTrigger`,
				link: [email],
				handler:
					'packages/functions/src/events/communication.triggerSendEmailHandler',
				role: sendEmailLambdaRoleARN,
			});

			return communicationApi;
		});
	}
);
