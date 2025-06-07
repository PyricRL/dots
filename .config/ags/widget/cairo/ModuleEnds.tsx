import { Gtk } from "astal/gtk4"
import cairo from "gi://cairo?version=1.0";

const topColor = [36 / 255, 37 / 255, 46 / 255, 0.8];
const bottomColor = [62 / 255, 64 / 255, 78 / 255, 0.8];

export function createLeftSlant(width = 20, height = 20): Gtk.DrawingArea {
    const slant = new Gtk.DrawingArea();

    slant.set_content_width(width);
    slant.set_content_height(height);

    slant.set_draw_func((_area, cr, w, h) => {
        const gradient = new (cairo as any).LinearGradient(0, 0, 0, h);

        gradient.addColorStopRGBA(
            0,
            topColor[0],
            topColor[1],
            topColor[2],
            topColor[3]
        );

        gradient.addColorStopRGBA(
            1,
            bottomColor[0],
            bottomColor[1],
            bottomColor[2],
            bottomColor[3]
        );

        cr.setSourceRGBA(0, 0, 0, 0);
        cr.paint();

        cr.setSource(gradient)

        cr.setLineWidth(2);

        cr.moveTo(0, 0);
        cr.lineTo(w, h);
        cr.lineTo(w, 0);
        cr.closePath();
        cr.fill();
    });

    return slant;
}

export function createRightSlant(width = 20, height = 20): Gtk.DrawingArea {
    const slant = new Gtk.DrawingArea();

    slant.set_content_width(width);
    slant.set_content_height(height);

    slant.set_draw_func((_area, cr, w, h) => {
        const gradient = new (cairo as any).LinearGradient(0, 0, 0, h);

        gradient.addColorStopRGBA(
            0,
            topColor[0],
            topColor[1],
            topColor[2],
            topColor[3]
        );

        gradient.addColorStopRGBA(
            1,
            bottomColor[0],
            bottomColor[1],
            bottomColor[2],
            bottomColor[3]
        );

        cr.setSourceRGBA(0, 0, 0, 0);
        cr.paint();

        cr.setSource(gradient)

        cr.setLineWidth(2);

        cr.moveTo(0, h);     // Top-left
        cr.lineTo(0, 0);     // Bottom-right
        cr.lineTo(w, 0);
        cr.closePath();
        cr.fill();
    });

    return slant;
}
