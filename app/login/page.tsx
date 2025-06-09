import { LoginForm } from "@/app/ui/catalogue/login/login-form";
import {Suspense} from "react";

export default function LoginPage() {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<Suspense>
				<LoginForm />
			</Suspense>
		</div>
	);
}
