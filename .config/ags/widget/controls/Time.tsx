import { GLib, Variable } from "astal";
import { Gtk } from "astal/gtk4";


export function Time({ format = "%I:%M" }) {
    const time = Variable<string>("").poll(1000, () => GLib.DateTime.new_now_local().format(format)!)

    const calendarPopover = new Gtk.Popover({
        child: new Gtk.Calendar(), // Create Gtk.Calendar as the child
        hasArrow: false
    });

    return <menubutton
            popover={calendarPopover}
        >
        <label
            cssClasses={["Time"]}
            onDestroy={() => time.drop()}
            label={time()}
        />
    </menubutton>
}