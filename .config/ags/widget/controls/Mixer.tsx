import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk4";
import Wp from "gi://AstalWp";

const wireplumber = Wp.get_default();
const audio = wireplumber?.audio;

// Observe audio streams
const streams = Variable(audio?.get_streams())
    .observe(audio, "stream-added", () => audio?.get_streams())
    .observe(audio, "stream-removed", () => audio?.get_streams());

export function MixerPopoverContent({ name }: { name: string }) {
    return (
        <box vertical name={name}>
            {bind(streams).as(t => {
                return t.map(stream => {
                    return (
                        <box vertical>
                            <box>
                                <box vertical>
                                    <label
                                        halign={Gtk.Align.START}
                                        label={`${stream.name === "Chromium" ? "Vesktop" : stream.name}`}
                                        ellipsize={3} maxWidthChars={22}
                                    />
                                    <label
                                        cssClasses={["streamDescription"]}
                                        halign={Gtk.Align.START}
                                        label={`${stream.description}`}
                                    />
                                </box>
                                <box>
                                    {bind(stream, "volume").as(t => (
                                        <label
                                            hexpand
                                            halign={Gtk.Align.END}
                                            valign={Gtk.Align.START}
                                            label={bind(stream, "volume").as((volume) => Math.round(volume * 100).toString() + "%",
                                            )} />
                                    ))}
                                </box>
                            </box>
                            <box>
                                <button
                                    onClicked={() => stream.set_mute?.(!stream.mute)}
                                    cssClasses={["volumeButton"]}
                                >
                                    <image iconName={bind(stream, "volumeIcon")} cssClasses={["volumeIcons"]} />
                                </button>
                                <slider
                                    hexpand
                                    max={1}
                                    min={0}
                                    onChangeValue={({ value }) => stream.set_volume(value)}
                                    value={bind(stream, "volume")}
                                />
                            </box>
                        </box>
                    );
                });
            })}
        </box>
    )
}
