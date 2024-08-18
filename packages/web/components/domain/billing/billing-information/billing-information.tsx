import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lib/shadcn/components/ui/card";

export const BillingInformation = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Billing</CardTitle>
				<CardDescription>
					View current plan details and manage billing information.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="bg-card p-4 rounded-lg">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<div className="text-muted-foreground">
									Usage
								</div>
								<div className="font-medium">
									5,000 / 10,000 emails sent
								</div>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};