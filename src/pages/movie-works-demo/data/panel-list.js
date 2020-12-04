// GLOBAL CONTEXT PANEL LIST
import { DevConsolePanel } from '../extensions/context-panels-toolbar/dev-console-panel.js';
import { DirectorySwitcherPanel } from '../extensions/context-panels-toolbar/dir-switch-panel.js';
import { NotificationsPanel } from '../extensions/context-panels-toolbar/notifications-panel.js';
import { PortalSettingsPanel } from '../extensions/context-panels-toolbar/portal-settings-panel.js';
import { HelpPanel } from '../extensions/context-panels-toolbar/help-panel.js';
import { FeedbackPanel } from '../extensions/context-panels-toolbar/feedback-panel.js';

const _shell_context_panels = [
	DevConsolePanel,
	DirectorySwitcherPanel,
	NotificationsPanel,
	PortalSettingsPanel,
	HelpPanel,
	FeedbackPanel
];

export
{
	_shell_context_panels as PanelsList
}