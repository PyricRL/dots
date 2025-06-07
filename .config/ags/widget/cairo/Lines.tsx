import { Gtk } from "astal/gtk4"
import cairo from "gi://cairo?version=1.0";

const topColor = [255 / 255, 255 / 255, 255 / 255, 0.8];
const bottomColor = [255 / 255, 255 / 255, 255 / 255, 0.8];

export function createLine(width = 20, height = 2, slantLength = 2): Gtk.DrawingArea {
    const slant = new Gtk.DrawingArea();

    slant.set_content_width(width + Math.abs(slantLength));
    slant.set_content_height(height);

    slant.set_draw_func((_area, cr, w, h, l) => {
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

        cr.setLineWidth(1);

        const startX = Math.max(0, slantLength);

        // 1. Move to the adjusted top-left corner.
        cr.moveTo(startX, 0);
        // 2. Draw a line to the top-right corner.
        cr.lineTo(startX + width, 0);
        // 3. Draw a line to the bottom-right corner, shifted by 'slantLength'.
        cr.lineTo(startX + width - slantLength, h);
        // 4. Draw a line to the bottom-left corner, shifted by 'slantLength'.
        cr.lineTo(startX - slantLength, h);
        // 5. Close the path, connecting the last point to the starting point.
        cr.closePath();

        cr.fill();
    });

    return slant;
}