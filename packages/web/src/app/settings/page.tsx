'use client';
import { Button } from '@lib/shadcn/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@lib/shadcn/components/ui/card';
import { Separator } from '@lib/shadcn/components/ui/separator';
import { Editor } from '@components/feature/editor';

export default async function Page() {
	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>Settings</CardTitle>
					<CardDescription>
						Configure email sender details, templates, and manage
						team members.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="bg-card p-4 rounded-lg">
							<div className="flex items-center justify-between">
								<div>
									<div className="font-medium">
										Email Sender Details
									</div>
									<div className="text-muted-foreground text-sm">
										Configure the "From" email address and
										name
									</div>
								</div>
								<div>
									<Button variant="outline" size="sm">
										Edit
									</Button>
								</div>
							</div>
							<Separator className="my-4" />
							<div className="grid grid-cols-2 gap-4">
								<div>
									<div className="text-muted-foreground">
										From Email
									</div>
									<div className="font-medium">
										noreply@example.com
									</div>
								</div>
								<div>
									<div className="text-muted-foreground">
										From Name
									</div>
									<div className="font-medium">
										Example Company
									</div>
								</div>
							</div>
						</div>
						<div className="bg-card p-4 rounded-lg">
							<div className="flex items-center justify-between">
								<div>
									<div className="font-medium">
										Email Templates
									</div>
									<div className="text-muted-foreground text-sm">
										Manage your email templates
									</div>
								</div>
								<div>
									<Button variant="outline" size="sm">
										Manage
									</Button>
								</div>
							</div>
							<Separator className="my-4" />
							<div className="grid grid-cols-2 gap-4">
								<div>
									<div className="text-muted-foreground">
										Templates
									</div>
									<div className="font-medium">5</div>
								</div>
								<div>
									<div className="text-muted-foreground">
										Last Updated
									</div>
									<div className="font-medium">
										2023-04-12
									</div>
								</div>
							</div>
						</div>
						<div className="bg-card p-4 rounded-lg">
							<div className="flex items-center justify-between">
								<div>
									<div className="font-medium">
										Team Members
									</div>
									<div className="text-muted-foreground text-sm">
										Manage access permissions
									</div>
								</div>
								<div>
									<Button variant="outline" size="sm">
										Manage
									</Button>
								</div>
							</div>
							<Separator className="my-4" />
							<div className="grid grid-cols-2 gap-4">
								<div>
									<div className="text-muted-foreground">
										Members
									</div>
									<div className="font-medium">5</div>
								</div>
								<div>
									<div className="text-muted-foreground">
										Last Updated
									</div>
									<div className="font-medium">
										2023-04-10
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<Editor />
		</div>
	);
}
