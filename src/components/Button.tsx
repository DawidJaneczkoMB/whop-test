import { Link } from "@tanstack/react-router";

interface ButtonProps {
	to: string;
	disabled?: boolean;
	children: React.ReactNode;
	className?: string;
}

export function Button({ to, disabled, children, className = "" }: ButtonProps) {
	const baseStyles = "text-white p-2 rounded-md text-center";
	const enabledStyles = "bg-blue-500";
	const disabledStyles = "bg-gray-400 cursor-not-allowed";

	if (disabled) {
		return (
			<button
				type="button"
				disabled
				className={`${baseStyles} ${disabledStyles} ${className}`}
			>
				{children}
			</button>
		);
	}

	return (
		<Link
			to={to}
			className={`${baseStyles} ${enabledStyles} ${className}`}
		>
			{children}
		</Link>
	);
}
