// src/App.tsx

import "./App.css";
import { useIdentityContext } from "./IdentityContext";

function App() {
	const { identity, loadingIdentity } = useIdentityContext();

	return loadingIdentity ?
		(<b>Loading...</b>) : (
			<>
			</>
		)
}

export default App;
