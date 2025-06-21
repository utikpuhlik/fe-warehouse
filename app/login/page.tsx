import { LoginForm } from "@/app/ui/catalogue/login/login-form";
import {Suspense} from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
	title: "Login | TCF",
	description: "Login Page"
}

export default function LoginPage() {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<Suspense>
				<LoginForm />
			</Suspense>
		</div>
	);
}
