import { App, Astal, Gtk, Gdk } from "astal/gtk4"
import { Variable, subprocess, bind } from "astal"

import { OpenApps } from "./controls/Apps"
import { Time } from "./controls/Time";
import { AudioTab } from "./controls/AudioTab";
import { createLeftSlant, createRightSlant } from "./cairo/ModuleEnds";

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return <window
        visible
        cssClasses={["Bar"]}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}
    >
        <centerbox cssClasses={["centerbox"]}>
            <box halign={Gtk.Align.BASELINE} cssClasses={["leftCont"]}>
                <box cssClasses={["leftContInfo"]}>
                    <button cssClasses={["controlButton"]}>
                        <image file={"/home/pyric/.config/ags/widget/utils/bmw-32-white.png"} />
                    </button>
                    <OpenApps />
                </box>
                <box cssClasses={["leftContCairo"]}>
                    {createRightSlant(25, 0)}
                </box>
            </box>
            <box cssClasses={["centerCont"]}>
            </box>
            <box halign={Gtk.Align.END} cssClasses={["rightCont"]}>
                <box cssClasses={["rightContCairo"]}>
                    {createLeftSlant(25, 0)}
                </box>
                <box cssClasses={["rightContInfo"]}>
                    <AudioTab />
                    <Time />
                </box>
            </box>
        </centerbox>
    </window>
}
