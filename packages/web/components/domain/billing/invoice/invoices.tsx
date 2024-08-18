'use client';
import { Types } from '@nerve-rack/core';
import { AppTable } from '@components/feature/table/table';
import { columns } from '@components/domain/billing/invoice/columns';

interface IProps {
	readonly paymentHistory: Array<Types.IPayment>;
}

export const Invoices = ({ paymentHistory }: IProps) => {
	return <AppTable columns={columns} data={paymentHistory} />;
}
