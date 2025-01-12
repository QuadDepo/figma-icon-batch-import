import { Networker } from "monorepo-networker";

export const UI = Networker.createSide("UI-side").listens<{
	ping(): "pong";
}>();

export const PLUGIN = Networker.createSide("Plugin-side").listens<{
	ping(): "pong";
}>();
