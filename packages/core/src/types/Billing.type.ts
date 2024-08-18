export interface IBillingDetails {
	name: 'Trial' | 'Pro' | 'Plus' | 'Enterprise';
	status: 'active' | 'canceled' | 'paused' | 'expired';
	limits: {
		used: number;
		max: number;
	};
	cycle: 'Yearly' | 'Monthly';
	nextBilling: Date;
	amount: {
		currency: 'R';
		value: number;
	};
	paymentMethod: {
		cardNumber: string;
		expiryDate: Date;
	};
	paymentHistory: Array<IPayment>;
}

export interface IPaymentMethod {
	type: 'Mastercard';
	number: string;
	expiryDate: Date;
	createdDate: Date;
	active: boolean;
}

export interface IPayment {
	period: {
		startDate: Date;
		endDate: Date;
	};
	status: 'Paid';
	amount: {
		currency: 'R';
		value: number;
	};
}

export interface IPlan {
	activePlan?: string;
	id: number;
	name: string;
	price: number;
	features: string[];
	onPlanChange: (newPlan: string) => void
}