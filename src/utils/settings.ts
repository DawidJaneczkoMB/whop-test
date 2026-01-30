import { useEffect, useState } from "react";

const STORAGE_KEYS = {
	apiKey: "whop_api_key",
	orgId: "whop_org_id",
	payoutOrgId: "whop_payout_org_id",
	planId: "whop_plan_id",
} as const;

function getFromStorage<T>(key: string): T | null {
	if (typeof window === "undefined") return null;
	const value = sessionStorage.getItem(key);
	return value ? (JSON.parse(value) as T) : null;
}

function setToStorage<T>(key: string, value: T): void {
	if (typeof window === "undefined") return;
	if (value === null) {
		sessionStorage.removeItem(key);
	} else {
		sessionStorage.setItem(key, JSON.stringify(value));
	}
}

export function getApiKey(): string | null {
	return getFromStorage<string>(STORAGE_KEYS.apiKey);
}

export function setApiKey(key: string): void {
	setToStorage(STORAGE_KEYS.apiKey, key);
}

export function getOrgId(): string | null {
	return getFromStorage<string>(STORAGE_KEYS.orgId);
}

export function setOrgId(id: string): void {
	setToStorage(STORAGE_KEYS.orgId, id);
}

export function getPlanId(): string | null {
	return getFromStorage<string>(STORAGE_KEYS.planId);
}

export function setPlanId(id: string): void {
	setToStorage(STORAGE_KEYS.planId, id);
}

export function useApiKey(): [string | null, (key: string) => void] {
	const [apiKey, setApiKeyState] = useState<string | null>(() => getApiKey());

	useEffect(() => {
		const handleStorageChange = () => {
			setApiKeyState(getApiKey());
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	const updateApiKey = (key: string) => {
		setApiKey(key);
		setApiKeyState(key);
	};

	return [apiKey, updateApiKey];
}

export function useOrgId(): [string | null, (id: string) => void] {
	const [orgId, setOrgIdState] = useState<string | null>(() => getOrgId());

	useEffect(() => {
		const handleStorageChange = () => {
			setOrgIdState(getOrgId());
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	const updateOrgId = (id: string) => {
		setOrgId(id);
		setOrgIdState(id);
	};

	return [orgId, updateOrgId];
}

export function getPayoutOrgId(): string | null {
	return getFromStorage<string>(STORAGE_KEYS.payoutOrgId);
}

export function setPayoutOrgId(id: string): void {
	setToStorage(STORAGE_KEYS.payoutOrgId, id);
}

export function usePayoutOrgId(): [string | null, (id: string) => void] {
	const [payoutOrgId, setPayoutOrgIdState] = useState<string | null>(() => getPayoutOrgId());

	useEffect(() => {
		const handleStorageChange = () => {
			setPayoutOrgIdState(getPayoutOrgId());
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	const updatePayoutOrgId = (id: string) => {
		setPayoutOrgId(id);
		setPayoutOrgIdState(id);
	};

	return [payoutOrgId, updatePayoutOrgId];
}

export function usePlanId(): [string | null, (id: string) => void] {
	const [planId, setPlanIdState] = useState<string | null>(() => getPlanId());

	useEffect(() => {
		const handleStorageChange = () => {
			setPlanIdState(getPlanId());
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	const updatePlanId = (id: string) => {
		setPlanId(id);
		setPlanIdState(id);
	};

	return [planId, updatePlanId];
}
