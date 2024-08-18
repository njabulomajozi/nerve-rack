'use client';
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	ColumnDef,
} from '@tanstack/react-table';
import { Card } from '@lib/shadcn/components/ui/card';
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@lib/shadcn/components/ui/table';

interface IProps {
	columns: ColumnDef<any, any>[];
	data: Array<any>;
}

export const AppTable = ({ columns, data }: IProps) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card>
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
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center"
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</Card>
	);
};
