import { bind, execAsync, Gio, Variable } from "astal";
import { Gtk } from "astal/gtk4";
import Apps from "gi://AstalApps";

import Hyprland from "gi://AstalHyprland"

const hyprland = Hyprland.get_default()

const workspaces = Variable(hyprland.get_workspaces())
const clients = Variable(hyprland.get_clients())

function getIcon(appName) {
    const apps = new Apps.Apps({
        nameMultiplier: 2,
        entryMultiplier: 0,
        executableMultiplier: 2,
    })

    let appsIcon = apps.fuzzy_query(appName);
    let icon = null;
    for (let app of appsIcon) {
        icon = app.get_icon_name();
        return icon;
    }

    return "terminal";
}

const handleChanges = () => {
  workspaces.set(hyprland.get_workspaces())
  clients.set(hyprland.get_clients())
}

hyprland.connect("client-added", handleChanges)
hyprland.connect("client-removed", handleChanges)

export function OpenApps() {
    return (
        <box cssClasses={["OpenApps"]}>
            {bind(clients).as(clientsValue =>
                clientsValue
                    .slice() // Create a shallow copy for sorting (optional)
                    .sort((a, b) => a.pid - b.pid) // Sort by PID (assuming 'pid' is the correct property) (optional)
                    .map((client) => {
                        const iconName = getIcon(client.class); // Assuming 'class' holds the app name
                        return (
                            <button
                                key={client.pid}
                                onButtonPressed={(self, event) => {
                                    const button = event.get_button();
                                    if (button === 2) {
                                        console.log("Middleclick");
                                        hyprland.dispatch("killwindow", `pid:${client.pid}`);
                                    }
                                    if (button === 1) {
                                        hyprland.dispatch("focuswindow", `pid:${client.pid}`);
                                    }
                                }}
                            >
                                <image iconName={iconName} />
                            </button>
                        );
                    })
            )}
        </box>
    );
}