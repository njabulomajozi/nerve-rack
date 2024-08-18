import { ColumnDef } from "@tanstack/react-table";
import { Types } from '@nerve-rack/core';

export const columns: ColumnDef<Types.IEmail>[] =[
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
