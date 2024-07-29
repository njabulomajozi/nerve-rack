/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'nerve-rack',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws',
			providers: {
				aws: {
					region: 'us-west-2',
				},
			},
		};
	},
	async run() {
		const infra = await import('./infra');

		return {
			api: {
				email: infra.Api.email.url,
			},
		};
	},
});
