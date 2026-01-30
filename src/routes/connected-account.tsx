import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useApiKey, useOrgId } from "../utils/settings";
import { Button } from "../components/Button";

export const Route = createFileRoute("/connected-account")({
	component: ConnectedAccount,
});

function ConnectedAccount() {
	const [apiKey] = useApiKey();
	const [orgId] = useOrgId();
	const [email, setEmail] = useState("");
	const [title, setTitle] = useState("");
	const [internalUserId, setInternalUserId] = useState("");
	const [sellerTier, setSellerTier] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [companyId, setCompanyId] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(false);
		setCompanyId(null);

		if (!apiKey || !orgId) {
			setError("API key and Org ID are required");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch(
				`/api/create-connected-account?apiKey=${encodeURIComponent(apiKey)}&orgId=${encodeURIComponent(orgId)}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						title,
						metadata: {
							internal_user_id: internalUserId,
							seller_tier: sellerTier,
						},
					}),
				},
			);

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || "Failed to create connected account");
			}

			const data = await response.json();
			setCompanyId(data.company?.id || null);
			setSuccess(true);
			setEmail("");
			setTitle("");
			setInternalUserId("");
			setSellerTier("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	if (!apiKey || !orgId) {
		return (
			<div className="p-20">
				API key and Org ID are required. Go back to the{" "}
				<Button to="/" className="text-blue-500 underline bg-transparent p-0">
					index
				</Button>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<div className="p-4 flex items-center relative">
				<Button
					to="/"
					className="flex items-center gap-1"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-label="Left chevron"
					>
						<title>Left chevron</title>
						<path d="m15 18-6-6 6-6" />
					</svg>
					Index
				</Button>
			</div>
			<div className="max-w-[600px] mx-auto p-10">
				<h1 className="text-2xl font-semibold mb-6">
					Create Connected Account
				</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block mb-2">
							Email:
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
							/>
						</label>
					</div>
					<div>
						<label className="block mb-2">
							Title:
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
								className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
							/>
						</label>
					</div>
					<div>
						<label className="block mb-2">
							Internal User ID:
							<input
								type="text"
								value={internalUserId}
								onChange={(e) => setInternalUserId(e.target.value)}
								className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
							/>
						</label>
					</div>
					<div>
						<label className="block mb-2">
							Seller Tier:
							<select
								value={sellerTier}
								onChange={(e) => setSellerTier(e.target.value)}
								className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
							>
								<option value="">Select tier</option>
								<option value="bronze">Bronze</option>
								<option value="silver">Silver</option>
								<option value="gold">Gold</option>
							</select>
						</label>
					</div>
					{error && (
						<div className="text-red-500 bg-red-50 p-3 rounded">{error}</div>
					)}
					{success && (
						<div className="text-green-500 bg-green-50 p-3 rounded">
							Connected account created successfully!
							{companyId && (
								<div className="mt-2">
									<strong>Company ID:</strong> {companyId}
								</div>
							)}
						</div>
					)}
					<button
						type="submit"
						disabled={loading}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
					>
						{loading ? "Creating..." : "Create Connected Account"}
					</button>
				</form>
			</div>
		</div>
	);
}
