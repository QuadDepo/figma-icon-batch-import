import { UI_CHANNEL } from "@ui/app.network";
import { useCallback, useEffect, useState } from "react";
import { PLUGIN } from "@common/networkSides";

function App() {
	const [count, setCount] = useState(0);
	const [pingCount, setPingCount] = useState(0);

	useEffect(() => {
		UI_CHANNEL.subscribe("ping", () => {
			setPingCount((cnt) => cnt + 1);
		});
	}, []);

	const handleSendPing = useCallback(async () => {
		const response = await UI_CHANNEL.request(PLUGIN, "ping", []);
		console.log("Response:", response);
	}, []);

	return (
		<main>
			<button onClick={handleSendPing}>Ping</button>
		</main>
	);
}

export default App;
