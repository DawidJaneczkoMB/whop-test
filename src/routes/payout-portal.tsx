import { createFileRoute, Link } from "@tanstack/react-router";
import {
	BalanceElement,
	Elements,
	PayoutsSession,
	WithdrawalsElement,
	WithdrawButtonElement,
} from "@whop/embedded-components-react-js";
import { loadWhopElements } from "@whop/embedded-components-vanilla-js";
import type { WhopElementsOptions } from "@whop/embedded-components-vanilla-js/types";
import { useEffect, useState } from "react";
import { useApiKey, useOrgId } from "../utils/settings";

const elements = loadWhopElements();

const appearance: WhopElementsOptions["appearance"] = {
	classes: {
		".Button": {
			height: "40px",
			"border-radius": "8px",
		},
		".Button:disabled": { "background-color": "gray" },
		".Container": { "border-radius": "12px" },
	},
};

export const Route = createFileRoute("/payout-portal")({
	component: PayoutPortal,
});

function PayoutPortal() {
	const [apiKey] = useApiKey();
	const [orgId, setOrgId] = useOrgId();
	const [inputValue, setInputValue] = useState(orgId || "");

	useEffect(() => {
		setInputValue(orgId || "");
	}, [orgId]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputValue) {
			setOrgId(inputValue);
		}
	};

	if (!apiKey) {
		return (
			<div className="p-20">
				No API key found. Go back to the{" "}
				<Link to="/" className="text-blue-500 underline">
					index
				</Link>
			</div>
		);
	}

	return (
		<div>
			<div className="p-4 flex items-center relative">
				<Link
					to="/"
					className="bg-blue-500 text-white p-2 rounded-md text-center flex items-center gap-1"
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
				</Link>
				<form
					onSubmit={handleSubmit}
					className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2"
				>
					<label className="flex items-center gap-2">
						Org ID:
						<input
							type="text"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
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
			<div className="max-w-[600px] mx-auto p-10">
				{orgId ? (
					<Elements appearance={appearance} elements={elements}>
						<PayoutsSession
							token={() =>
								fetch(
									`/api/token?apiKey=${encodeURIComponent(apiKey || "")}&orgId=${encodeURIComponent(orgId || "")}`,
								)
									.then((res) => res.json())
									.then((data) => data.token)
							}
							companyId={orgId || "biz_3GBP0kaBXAnbjT"}
							redirectUrl="http://localhost:3000"
						>
							<section
								style={{ display: "flex", flexDirection: "column", gap: "8px" }}
							>
								<div
									style={{
										height: "95.5px",
										width: "100%",
										position: "relative",
									}}
								>
									<BalanceElement fallback={<div>Loading...</div>} />
								</div>
								<div
									style={{
										height: "40px",
										width: "100%",
										position: "relative",
									}}
								>
									<WithdrawButtonElement fallback={<div>Loading...</div>} />
								</div>
								<WithdrawalsElement fallback={<div>Loading...</div>} />
							</section>
						</PayoutsSession>
					</Elements>
				) : (
					<div>No org ID found.</div>
				)}
			</div>
		</div>
	);
}
