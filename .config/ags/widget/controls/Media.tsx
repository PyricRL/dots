import { Gio, bind, Variable } from "astal";
import Mpris from "gi://AstalMpris";

import { createRightAccent } from "../cairo/CornerAccent";
import { astalify, Gtk } from "astal/gtk4";

export const Picture = astalify<Gtk.Picture, Gtk.Picture.ConstructorProps>(Gtk.Picture, {})

const mpris = Mpris.get_default();

const players = Variable(mpris.get_players())
    .observe(mpris, "player-added", () => mpris?.get_players())
    .observe(mpris, "player-closed", () => mpris?.get_players())


export function MprisWidget({ name }: { name: string }) {
    return (
        <box vertical name={name}>
            {bind(players).as((playerList) => {
                if (!playerList || playerList.length === 0) {
                    return <label>No media players running</label>;
                }
                return playerList.map((player) => (
                    <box vertical cssClasses={["mediaContainer"]}>
                        <box hexpand>
                            <box cssClasses={["coverArtContainer"]}>
                                <Picture contentFit={Gtk.ContentFit.COVER} file={bind(player, "coverArt").as((art) => Gio.file_new_for_path(art) || "")} />
                            </box>
                            <box vertical cssClasses={["mediaInfoContainer"]} valign={Gtk.Align.CENTER}>
                                <label cssClasses={["mediaTitle"]} halign={Gtk.Align.START} label={bind(player, "title").as((title) => title.toUpperCase())} />
                                <label cssClasses={["mediaAlbum"]} halign={Gtk.Align.START} label={bind(player, "album")} ellipsize={3} maxWidthChars={15} />
                                <label cssClasses={["mediaArtist"]} halign={Gtk.Align.START} label={bind(player, "artist")} />
                            </box>
                            {createRightAccent(50, 60)}
                        </box>
                        <box hexpand>
                            <button cssClasses={["mediaButton", "mediaRewindButton"]}>skip_previous</button>
                            <slider
                                min={0}
                                step={1}
                                max={player?.length}
                                onChangeValue={({value}) => player.set_position(value)}
                                value={bind(player, "position")}
                            />
                            <button cssClasses={["mediaButton", "mediaSkipButton"]}>skip_next</button>
                        </box>
                    </box>
                ));
            })}
        </box>
    );
}