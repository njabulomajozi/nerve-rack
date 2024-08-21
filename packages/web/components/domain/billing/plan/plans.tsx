'use client';
import { useMemo, useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheck
} from '@fortawesome/free-solid-svg-icons';
import { Types } from '@nerve-rack/core';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@lib/shadcn/components/ui/card';
import { Button } from '@lib/shadcn/components/ui/button';


interface IProps {
	readonly plans: Array<Types.IPlan>;
}

export const Plans = ({ plans }: IProps) => {
	const [activePlan, setActivePlan] = useState('Starter');

	const onPlanChange = (newPlan: string) => {
		const n = newPlan === activePlan ? '' : newPlan;
		setActivePlan(n);
	};

	return (
		<div
			className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
		>
			{plans.map(({ id, name, price, features }) => (
				<Plan
					activePlan={activePlan}
					key={id}
					id={id}
					name={name}
					price={price}
					features={features}
					onPlanClick={(data) => onPlanChange(data.plan)}
				/>
			))}
		</div>
	);
};

const Plan = ({ activePlan, id, name, price, features, onPlanClick }: Types.IPlan) => {
	const buttonText: string = useMemo(() => {
		return typeof activePlan === 'string'
			? activePlan === name ? 'Cancel' : 'Upgrade'
			: 'Choose Plan';
	}, [activePlan, name]);

	const containerClassName = useMemo(() => {
		return classNames({
			'bg-primary text-white hover:bg-primary': activePlan === name,
			'bg-secondary text-black hover:bg-secondary': activePlan !== name,
		});
	}, [activePlan, name]);

	const featureIconClassName = useMemo(() => {
		return classNames({
			'h-4 w-4 text-green-500': true,
		});
	}, [activePlan, name]);

	const buttonClassName = useMemo(() => {
		return classNames({
			'w-full': true,
			'bg-primary text-white hover:bg-primary': activePlan !== name,
			'bg-secondary text-black hover:bg-secondary': activePlan === name,
		});
	}, [activePlan, name]);

	return (
		<Card className={containerClassName} key={id}>
			<CardHeader> 
				<CardTitle>{name}</CardTitle>
				<CardDescription>
					<div className="text-4xl font-bold">R{price}</div>
					<div className="text-muted-foregrounda">per month</div>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className="space-y-2 text-sm">
					{features.map((feature, index) => (
						<li key={index} className="flex items-center gap-2">
							<FontAwesomeIcon icon={faCheck} className={featureIconClassName} />
							{feature}
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter>
				<Button
					className={buttonClassName}
					onClick={() => onPlanClick?.({ plan: name})}
				>{buttonText}</Button>
			</CardFooter>
		</Card>
	);
};
