import { createFileRoute, Link } from "@tanstack/react-router";
import { WhopCheckoutEmbed } from "@whop/checkout/react";
import { useEffect, useState } from "react";
import { usePlanId } from "../utils/settings";

export const Route = createFileRoute("/checkout")({ component: Checkout });

function Checkout() {
	const [planId, setPlanId] = usePlanId();
	const [inputValue, setInputValue] = useState(planId || "");

	useEffect(() => {
		setInputValue(planId || "");
	}, [planId]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputValue) {
			setPlanId(inputValue);
		}
	};

	return (
		<div className="min-h-screen">
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
						Plan ID:
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
			<div className="grid grid-cols-2 h-full">
				<div className="bg-white p-4 h-full">
					<div className="flex flex-col gap-10">
						<div className="flex items-center gap-4">
							<img
								src="/logo192.png"
								alt="Product Logo"
								className="w-20 h-20"
							/>
							<h3 className="text-2xl font-semibold">Company name</h3>
						</div>
						<div className="space-y-4 bg-gray-300 p-4 rounded border border-gray-900 h-full">
							<h4 className="text-3xl font-semibold">Product name</h4>
							<p className="text-gray-500">
								Product description blah blah blah blah blah blah blah blah blah
								blah blah blah blah blah blah blah blah blah blah blah blah blah
								blah blah blah blah blah blah blah blah blah blah blah blah blah
								blah blah blah blah{" "}
							</p>
							<div className="grid grid-cols-2 items-center gap-2">
								<div className="bg-gray-700 p-4 rounded border border-gray-900 h-52">
									<p className="text-white">Some product stuff like photos</p>
								</div>
								<div className="bg-gray-700 p-4 rounded border border-gray-900 h-52">
									<p className="text-white">Some product stuff like reviews</p>
								</div>
							</div>
							<div className="bg-gray-700 p-4 rounded border border-gray-900 h-52">
								<p className="text-white">
									Some other typical product page stuff
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="[&_iframe]:h-full!">
					{planId ? (
						<WhopCheckoutEmbed planId={planId} />
					) : (
						<div>No plan ID found.</div>
					)}
				</div>
			</div>
		</div>
	);
}
