'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type IconDefinition } from '@fortawesome/free-regular-svg-icons';
import {
	faGear,
	faHouse,
	faInbox,
	faKey,
	faReceipt,
} from '@fortawesome/free-solid-svg-icons';

import { Button } from '@lib/shadcn/components/ui/button';
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@lib/shadcn/components/ui/tooltip';
import {
	Sheet,
	SheetTrigger,
	SheetContent,
} from '@lib/shadcn/components/ui/sheet';

export interface IMenuItem {
	path: string;
	title: string;
	icon: IconDefinition;
}

const menuList: Array<IMenuItem> = [
	{
		path: '#',
		title: 'Overview',
		icon: faHouse,
	},
	{
		path: '#',
		title: 'Emails',
		icon: faInbox,
	},
	{
		path: '#',
		title: 'API Keys',
		icon: faKey,
	},
	{
		path: '#',
		title: 'Plans & Billing',
		icon: faReceipt,
	},
	{
		path: '#',
		title: 'Settings',
		icon: faGear,
	},
];

export const DesktopNav = () => {
	const currentPath = usePathname();

	return (
		<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
			<TooltipProvider>
				{menuList.map(({ path, title, icon }) => {
					const isActive = currentPath === path;

					if (isActive) {
						return (
							<Link
								href={path}
								className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
								prefetch={false}
							>
								<FontAwesomeIcon icon={icon} />
								<span className="sr-only">{title}</span>
							</Link>
						);
					}

					return (
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href={path}
									className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
									prefetch={false}
								>
									<FontAwesomeIcon icon={icon} />
									<span className="sr-only">{title}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">
								{title}
							</TooltipContent>
						</Tooltip>
					);
				})}
			</TooltipProvider>
		</nav>
	);
};

export const MobileNav = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="outline" className="sm:hidden">
					<MenuIcon className="h-5 w-5" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="sm:max-w-xs">
				<nav className="grid gap-6 text-lg font-medium">
					{menuList.map(({ path, title, icon }) => {
						const mainNav = true;

						const currentClassName = mainNav
							? 'group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
							: 'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground';

						return (
							<Link
								href={path}
								className={currentClassName}
								prefetch={false}
							>
								{mainNav ? (
									<FontAwesomeIcon
										className="h-5 w-5 transition-all group-hover:scale-110"
										icon={icon}
									/>
								) : (
									<FontAwesomeIcon
										className="h-5 w-5"
										icon={icon}
									/>
								)}

								{mainNav ? (
									<span className="sr-only">{title}</span>
								) : (
									<>{title}</>
								)}
							</Link>
						);
					})}
				</nav>
			</SheetContent>
		</Sheet>
	);
};

function MenuIcon(props) {
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
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	);
}
