import { useMemo } from 'react';
import moment from 'moment';
import { Types } from '@nerve-rack/core';
import { Emails } from '@components/domain/email';

export default async function Page() {
	const emails = useMemo<Array<Types.IEmail>>(() => {
		return [
			{
				id: '20240812-9876',
				recipients: ['john@example.com', 'john@example.com'],
				status: 'Delivered',
				timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
			},
		];
	}, []);

	return (
		<Emails emails={emails} />
	);
}