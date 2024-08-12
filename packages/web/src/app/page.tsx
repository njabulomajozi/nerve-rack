'use client';
import { useMemo } from 'react';
import moment from 'moment';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from '@lib/shadcn/components/ui/card';
import { Emails, type IEmail } from '@components/email';

interface IStat {
	Icon: any;
	title: string;
	value: string;
	description: string;
}

export default function Home() {
	const emails = useMemo<Array<IEmail>>(() => {
		return [
			{
				id: '20240812-9876',
				recipients: ['john@example.com', 'john@example.com'],
				status: 'Delivered', // Pending Failed
				timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
			},
		];
	}, []);

	const stats = useMemo<Array<IStat>>(() => {
		return [
			{
				Icon: () => (
					<MailIcon className="w-4 h-4 text-muted-foreground" />
				),
				title: 'Emails Sent',
				value: '12,345',
				description: '+20.1% from last month',
			},
			{
				Icon: () => (
					<CheckIcon className="w-4 h-4 text-muted-foreground" />
				),
				title: 'Delivered',
				value: '12,345',
				description: '+18.2% from last month',
			},
			{
				Icon: () => (
					<EyeIcon className="w-4 h-4 text-muted-foreground" />
				),
				title: 'Opened',
				value: '12,345',
				description: '+20.1% from last month',
			},
			{
				Icon: () => <XIcon className="w-4 h-4 text-muted-foreground" />,
				title: 'Bounced',
				value: '12,345',
				description: '+20.1% from last month',
			},
		];
	}, []);

	return (
		<>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{stats.map(({ Icon, title, value, description }, index) => {
					return (
						<Card key={index}>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">
									{title}
								</CardTitle>
								<Icon />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{value}
								</div>
								<p className="text-xs text-muted-foreground">
									{description}
								</p>
							</CardContent>
						</Card>
					);
				})}
			</div>
			<Emails emails={emails} />
		</>
	);
}

function CheckIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M20 6 9 17l-5-5" />
		</svg>
	);
}

function EyeIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	);
}

function MailIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect width="20" height="16" x="2" y="4" rx="2" />
			<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		</svg>
	);
}

function XIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	);
}
