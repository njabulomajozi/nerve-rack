'use client';
import { Types } from '@nerve-rack/core';
import { AppTable } from '@components/feature/table/table';
import { columns } from '@components/domain/billing/payment-method/columns';

interface IProps {
	readonly methods: Array<Types.IPaymentMethod>;
}

export const PaymentMethods = ({ methods }: IProps) => {
	return <AppTable columns={columns} data={methods} />;
}
