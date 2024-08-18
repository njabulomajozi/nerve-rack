'use client';
import { Types } from '@nerve-rack/core';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from '@lib/shadcn/components/ui/card';
import { AppTable } from '@components/feature/table/table';
import { columns } from '@components/domain/email/columns';

interface IProps {
	emails: Array<Types.IEmail>;
}

interface IStatusConfig {
	[key: string]: {
		actions: Array<string>;
		classes: Array<string>;
	};
}

const config: IStatusConfig = {
	Delivered: {
		actions: [],
		classes: ['bg-green-500', 'text-green-50'],
	},
	Pending: {
		actions: [],
		classes: ['bg-yellow-500', 'text-yellow-50'],
	},
	Failed: {
		actions: [],
		classes: ['bg-red-500', 'text-red-50'],
	},
};

export function Emails({ emails }: IProps) {
	return (
		<Card>
			<CardHeader className="px-7">
				<CardTitle>Email Logs</CardTitle>
				<CardDescription>
					Detailed log of all emails sent, including status,
					timestamp, and recipient information.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<AppTable columns={columns} data={emails} />
			</CardContent>
		</Card>
	);
}
