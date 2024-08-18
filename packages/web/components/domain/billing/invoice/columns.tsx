import { ColumnDef } from "@tanstack/react-table";
import { Types } from '@nerve-rack/core';

export const columns: ColumnDef<Types.IPayment>[] = [
    {
        id: 'period',
        header: 'Period',
        cell: ({row}) => {
            const startDatePeriod = row.getValue('period.startDate');
            const endDatePeriod = row.getValue('period.endDate');
            const value = `${startDatePeriod} - ${endDatePeriod}`;

            return <>{value}</>;
        }
    },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
    },
    {
        id: 'amount',
        header: 'Total',
        accessorKey: 'amount.value',
    },
];