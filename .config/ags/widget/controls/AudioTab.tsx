import { Gtk } from "astal/gtk4";
import { Variable } from "astal";

import { AudioPopoverGlance, AudioPopoverContent } from "./Audio";
import { MixerPopoverContent } from "./Mixer";
import { MprisWidget } from "./Media";
import { createLine } from "../cairo/Lines";

export function AudioPopover() {
    const visibleChildName = Variable("audio");
    return (
        <popover cssClasses={["audioPopover"]} hasArrow={false} autohide={false}>
            <box vertical vexpand>
                <box cssClasses={["audioPopoverTabButtons"]}>
                    <button cssClasses={["audioPopoverTabButton"]} on_clicked={() => visibleChildName.set("audio")} hexpand>
                        <label cssClasses={["googleIcon"]}>headphones</label>
                    </button>
                    <button cssClasses={["audioPopoverTabButton"]} on_clicked={() => visibleChildName.set("mixer")} hexpand>
                        <label cssClasses={["nerdFontIcon"]} label={"\udb81\ude2e"} />
                    </button>
                    <button cssClasses={["audioPopoverTabButton"]} onClicked={() => visibleChildName.set("media")} hexpand>
                        <image iconName={"audio-x-generic-symbolic"} />
                    </button>
                </box>
                <box cssClasses={["cairoLine"]}>
                    {createLine(320, 3, 3)}
                </box>
                <box>
                    <stack
                        transition_type={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
                        transition_duration={250}
                        visible_child_name={visibleChildName()}
                        cssClasses={["AudioPopoverStack"]}
                        vexpand
                    >
                        <AudioPopoverContent name="audio" />
                        <MixerPopoverContent name="mixer" />
                        <MprisWidget name="media" />
                    </stack>
                </box>
            </box>
        </popover>
    )
}

export function AudioTab() {
    return (
        <menubutton
            popover={(<AudioPopover />) as Gtk.Popover}
            cssClasses={["audioPopoverTab"]}
        >
            <AudioPopoverGlance />
        </menubutton>
    )
}
