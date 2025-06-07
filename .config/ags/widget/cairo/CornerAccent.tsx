import { Gtk } from "astal/gtk4"
import cairo from "gi://cairo?version=1.0";

export function createRightAccent(width = 20, height = 20): Gtk.DrawingArea {
    const slant = new Gtk.DrawingArea();

    slant.set_content_width(width);
    slant.set_content_height(height);

    slant.set_hexpand(false);
    slant.set_vexpand(false);

    slant.set_halign(Gtk.Align.END);
    slant.set_valign(Gtk.Align.START)

    slant.set_draw_func((_area, cr, w, h) => {

        cr.setSourceRGBA(10/255, 10/255, 12/255, 1);

        cr.setLineWidth(2);

        cr.moveTo(0, 0);
        cr.lineTo(w, 0);
        cr.lineTo(w, h);
        cr.closePath();
        cr.fill();
    });

    return slant;
}

export function createLeftAccent(width = 20, height = 20): Gtk.DrawingArea {
    const slant = new Gtk.DrawingArea();

    slant.set_content_width(width);
    slant.set_content_height(height);

    slant.set_hexpand(false);
    slant.set_vexpand(false);

    slant.set_draw_func((_area, cr, w, h) => {

        cr.setSourceRGBA(1, 1, 1, 1);
        cr.paint();

        cr.setLineWidth(2);

        cr.moveTo(0, 0);
        cr.lineTo(0, h);
        cr.lineTo(w, 0);
        cr.closePath();
        cr.fill();
    });

    return slant;
}