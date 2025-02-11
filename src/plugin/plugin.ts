import { PLUGIN, UI } from "@common/networkSides";
import { PLUGIN_CHANNEL } from "@plugin/plugin.network";
import { Networker } from "monorepo-networker";

async function bootstrap() {
	Networker.initialize(PLUGIN, PLUGIN_CHANNEL);

	if (figma.editorType === "figma") {
		figma.showUI(__html__, {
			width: 800,
			height: 650,
			title: "My Figma Plugin!",
		});
	}

	console.log("Bootstrapped @", Networker.getCurrentSide().name);

	setInterval(() => PLUGIN_CHANNEL.emit(UI, "ping", []), 5000);
}

bootstrap();
