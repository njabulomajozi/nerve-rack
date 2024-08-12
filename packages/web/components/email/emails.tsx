'use client';
import { useMemo } from 'react';
import {
	ColumnDef,
	useReactTable,
	getCoreRowModel,
} from '@tanstack/react-table';
import { Badge } from '@lib/shadcn/components/ui/badge';
import { Button } from '@lib/shadcn/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from '@lib/shadcn/components/ui/card';
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@lib/shadcn/components/ui/table';

export interface IEmail {
	id: string;
	recipients: Array<string>;
	status: string;
	timestamp: string;
}

interface IProps {
	emails: Array<IEmail>;
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
	const columns = useMemo<ColumnDef<IEmail>[]>(() => {
		return [
			{
				id: 'id',
				header: 'ID',
				accessorKey: 'id',
			},
			{
				id: 'recipients',
				header: 'Recipients',
				accessorKey: 'recipients',
			},
			{
				id: 'status',
				header: 'Status',
				accessorKey: 'status',
			},
			{
				id: 'timestamp',
				header: 'Timestamp',
				accessorKey: 'timestamp',
			},
		];
	}, []);

	const table = useReactTable({
		data: emails,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

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
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => {
							return (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
										>
											{header.column.columnDef.header?.toString()}
										</TableHead>
									))}
								</TableRow>
							);
						})}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.map((row, index) => {
							const id = row.getValue<Array<string>>('id');
							const recipients =
								row.getValue<Array<string>>('recipients');
							const status = row.getValue<string>('status');
							const timestamp = row.getValue<string>('timestamp');

							const { actions, classes } = config[status];

							return (
								<TableRow key={`${row.id}_${index}`}>
									<TableCell>
										<div className="font-medium">
											{id}
										</div>
									</TableCell>
									<TableCell>
										<div className="font-medium">
											{recipients.join(', ')}
										</div>
									</TableCell>
									<TableCell>
										<Badge
											className={classes.join(' ')}
											variant="outline"
										>
											{status}
										</Badge>
									</TableCell>
									<TableCell>
										{timestamp.toString()}
									</TableCell>
									<TableCell className="text-right">
										<Button
											variant="outline"
											size="sm"
											className="h-7 gap-1"
										>
											ICON PLACEHOLDER
											<span className="sr-only">
												Retry
											</span>
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
