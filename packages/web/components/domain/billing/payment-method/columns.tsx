import { ColumnDef } from "@tanstack/react-table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCcMastercard,
    faCcVisa
} from '@fortawesome/free-brands-svg-icons';
import { Types } from '@nerve-rack/core';

export const columns: ColumnDef<Types.IPaymentMethod>[] = [
    {
        id: 'active',
        header: 'Active',
        accessorKey: 'active',
    },
    {
        id: 'type',
        header: 'Type',
        cell: ({row}) => {
            return <FontAwesomeIcon icon={faCcMastercard} />
        }
    },
    {
        id: 'number',
        header: 'Card Number',
        accessorKey: 'number',
    },
    {
        accessorKey: 'expiryDate',
        header: 'Expiry Date',
        cell: ({row}) => {
            return <></>
        }
    },
];