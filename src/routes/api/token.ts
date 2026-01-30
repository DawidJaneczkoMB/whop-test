import { createFileRoute } from "@tanstack/react-router";
import { Whop } from "@whop/sdk";

export const Route = createFileRoute("/api/token")({
	server: {
		handlers: {
			GET: async ({ request }) => {
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

				const client = new Whop({
					apiKey,
					baseURL: "https://sandbox-api.whop.com/api/v1",
				});

				const companyId = orgId;

				const tokenResponse = await client.accessTokens
					.create({
						company_id: companyId,
					})
					.catch((error) => {
						console.error(
							"===========================================ERROR===========================================\n",
							error,
						);
						return null;
					});

				if (!tokenResponse) {
					return new Response(
						JSON.stringify({ error: "Failed to create access token" }),
						{
							status: 500,
							headers: { "Content-Type": "application/json" },
						},
					);
				}

				const { token } = tokenResponse;

				return new Response(JSON.stringify({ token }), {
					headers: { "Content-Type": "application/json" },
				});
			},
		},
	},
});
