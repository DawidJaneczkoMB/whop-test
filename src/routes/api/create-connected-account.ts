import { createFileRoute } from "@tanstack/react-router";
import { Whop } from "@whop/sdk";

export const Route = createFileRoute("/api/create-connected-account")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const url = new URL(request.url);
				const apiKey = url.searchParams.get("apiKey");
				const orgId = url.searchParams.get("orgId");

				if (!apiKey) {
					return new Response(
						JSON.stringify({ error: "API key is required" }),
						{
							status: 400,
							headers: { "Content-Type": "application/json" },
						},
					);
				}

				if (!orgId) {
					return new Response(JSON.stringify({ error: "Org ID is required" }), {
						status: 400,
						headers: { "Content-Type": "application/json" },
					});
				}

				const body = await request.json();

				const client = new Whop({
					apiKey,
					baseURL: "https://sandbox-api.whop.com/api/v1",
				});

				const company = await client.companies.create({
					email: body.email,
					parent_company_id: orgId,
					title: body.title,
					metadata: body.metadata,
				});

				return new Response(JSON.stringify({ company }), {
					status: 200,
					headers: { "Content-Type": "application/json" },
				});
			},
		},
	},
});
