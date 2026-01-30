import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useApiKey, useOrgId } from "../utils/settings";

export const Route = createFileRoute("/")({ component: App });

function App() {
	const [apiKey, setApiKey] = useApiKey();
	const [orgId, setOrgId] = useOrgId();
	const [inputValue, setInputValue] = useState(apiKey || "");
	const [orgIdValue, setOrgIdValue] = useState(orgId || "");

	useEffect(() => {
		setInputValue(apiKey || "");
	}, [apiKey]);

	useEffect(() => {
		setOrgIdValue(orgId || "");
	}, [orgId]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputValue) {
			setApiKey(inputValue);
		}
		if (orgIdValue) {
			setOrgId(orgIdValue);
		}
	};

	return (
		<div className="min-h-screen">
			<div className="p-4 flex items-center justify-center">
				<form onSubmit={handleSubmit} className="flex items-center gap-2">
					<label className="flex items-center gap-2">
						API Key:
						<input
							type="text"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							className="border border-gray-300 rounded px-2 py-1"
						/>
					</label>
					<label className="flex items-center gap-2">
						Main Org ID:
						<input
							type="text"
							value={orgIdValue}
							onChange={(e) => setOrgIdValue(e.target.value)}
							className="border border-gray-300 rounded px-2 py-1"
						/>
					</label>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Submit
					</button>
				</form>
			</div>
			<div className="flex gap-5 items-center justify-center h-full max-w-4xl mx-auto p-10">
				<Button to="/checkout" disabled={!apiKey}>
					Checkout
				</Button>
				<Button to="/payout-portal" disabled={!apiKey}>
					Payout Portal
				</Button>
				<Button to="/connected-account" disabled={!apiKey}>
					Connected Account
				</Button>
			</div>
		</div>
	);
}
