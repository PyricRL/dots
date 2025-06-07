import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk4";
import Wp from "gi://AstalWp"

const audio = Wp.get_default()!.audio;

export function AudioPopoverGlance() {
    return (
        <box>
            {bind(audio, "defaultSpeaker").as((speaker) => speaker && (
                <box halign={Gtk.Align.START} cssClasses={["speakerIconGlance"]} hexpand>
                    <image iconName={bind(speaker, "volumeIcon")} cssClasses={["volumeIcons"]} />
                    <label label={bind(speaker, "volume").as((vol) => `${Math.round(vol * 100)}%`)} />
                </box>
            ))}
            {bind(audio, "defaultMicrophone").as((mic) => mic && (
                <box halign={Gtk.Align.END} cssClasses={["micIconGlance"]} hexpand>
                    <image iconName={bind(mic, "volumeIcon")} cssClasses={["volumeIcons"]} />
                    <label label={bind(mic, "volume").as((vol) => `${Math.round(vol * 100)}%`)} />
                </box>
            ))}
        </box>
    );
}

export function AudioPopoverContent({ name }: { name: string }) {
    return (
        <box vertical name={name}>
            <box vertical>
                {bind(audio, "defaultSpeaker").as((speaker) => speaker && (
                    <>
                        <box hexpand cssClasses={["volumePercentBox"]}>
                            <label label={bind(speaker, "description").as((desc) => desc ?? "Speaker")} />
                            <label hexpand halign={Gtk.Align.END} cssClasses={["volumePercent"]} label={bind(speaker, "volume").as((volume) => `${Math.round(volume * 100)}%`)} />
                        </box>
                        <box>
                            <button
                                onClicked={() => speaker.set_mute?.(!speaker.mute)}
                                cssClasses={["volumeButton"]}
                            >
                                <image iconName={bind(speaker, "volumeIcon")} cssClasses={["volumeIcons"]} />
                            </button>
                            <slider
                                hexpand
                                max={100}
                                min={0}
                                value={bind(speaker, "volume").as((volume) => volume * 100)}
                                onChangeValue={(slider) => speaker.set_volume(slider.value / 100)}
                            />
                        </box>
                    </>
                ))}
            </box>
            <box vertical>
                {bind(audio, "defaultMicrophone").as((mic) => mic && (
                    <>
                        <box>
                            <label label={bind(mic, "description").as((desc) => desc ?? "Microphone")} />
                            <label hexpand halign={Gtk.Align.END} cssClasses={["volumePercent"]} label={bind(mic, "volume").as((volume) => `${Math.round(volume * 100)}%`)} />
                        </box>
                        <box>
                            <button
                                onClicked={() => mic.set_mute?.(!mic.mute)}
                                cssClasses={["volumeButton"]}
                            >
                                <image iconName={bind(mic, "volumeIcon")} cssClasses={["volumeIcons"]} />
                            </button>
                            <slider
                                hexpand
                                max={100}
                                min={0}
                                value={bind(mic, "volume").as((volume) => volume * 100)}
                                onChangeValue={(slider) => mic.set_volume(slider.value / 100)}
                            />
                        </box>
                    </>
                ))}
            </box>
        </box>
    );
}
