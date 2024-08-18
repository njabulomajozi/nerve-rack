import { Button } from '@lib/shadcn/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@lib/shadcn/components/ui/card';

export default async function Page() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>API Keys</CardTitle>
				<CardDescription>
					Manage API keys for accessing the email sending API.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="bg-card p-4 rounded-lg">
						<div className="flex items-center justify-between">
							<div className="font-medium">
								abcd1234-efgh-5678-ijkl-mnop9012qrst
							</div>
							<div>
								<Button variant="outline" size="sm">
									Revoke
								</Button>
								<Button variant="outline" size="sm">
									Copy
								</Button>
							</div>
						</div>
					</div>
					<Button>Generate New API Key</Button>
				</div>
			</CardContent>
		</Card>
	);
}
