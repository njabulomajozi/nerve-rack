import { useMemo } from 'react';
import { Types } from '@nerve-rack/core';
import { Invoices, PaymentMethods, Plans, BillingInformation } from '@components/domain/billing';

export default async function Page() {
	const plan = useMemo<Types.IBillingDetails>(() => {
		return {
			name: 'Pro',
			status: 'active',
			limits: {
				used: 5000,
				max: 10000,
			},
			cycle: 'Monthly',
			nextBilling: new Date('2 Sept 2024'),
			amount: {
				currency: 'R',
				value: 123,
			},
			paymentMethod: {
				cardNumber: '',
				expiryDate: new Date('31 Jan 2026'),
			},
			paymentHistory: [
				{
					period: {
						startDate: new Date('2 Aug 2024'),
						endDate: new Date('2 Sept 2024'),
					},
					status: 'Paid',
					amount: {
						currency: 'R',
						value: 99,
					},
				},
			],
		};
	}, []);

	const plans = useMemo(() => {
		return [
			{
				id: 1,
				name: 'Starter',
				price: 99,
				features: ['1 API Key', '100 Requests/Month', 'Basic Support'],
			},
			{
				id: 2,
				name: 'Pro',
				price: 199,
				features: [
					'5 API Keys',
					'1000 Requests/Month',
					'Priority Support',
				],
			},
			{
				id: 3,
				name: 'Enterprise',
				price: 10000,
				features: [
					'Unlimited API Keys',
					'Unlimited Requests',
					'Dedicated Support',
				],
			},
		];
	}, []);

	const paymentHistory = useMemo<Types.IPayment[]>(() => {
		return [
			{
				period: {
					startDate: new Date('2 Aug 2024'),
					endDate: new Date('2 Sept 2024'),
				},
				status: 'Paid',
				amount: {
					currency: 'R',
					value: 99,
				},
			},
		];
	}, []);

	const paymentMethods = useMemo<Types.IPaymentMethod[]>(() => {
		return [
			{
				type: 'Mastercard',
				number: '**** **** **** 1234',
				expiryDate: new Date('1 Jan 2027'),
				createdDate: new Date('1 Jan 2027'),
				active: false,
			},
		];
	}, []);

	return (
		<>
			<section className="pt-4">
				<Plans plans={plans}/>
			</section>
			<section className="pt-4">
				<Invoices paymentHistory={paymentHistory} />
			</section>
			<section className="pt-4">
				<PaymentMethods methods={paymentMethods} />
			</section>
			<section className="pt-4">
				<BillingInformation />
			</section>
		</>
	);
}
