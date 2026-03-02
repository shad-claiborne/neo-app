import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { IdentityProvider } from './IdentityContext';
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<IdentityProvider>
			<App />
		</IdentityProvider>
	</StrictMode>
);
