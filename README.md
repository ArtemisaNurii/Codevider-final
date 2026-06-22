This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# To generate opengraph-images use this script:

```py
import subprocess
from pathlib import Path
from xml.etree import ElementTree as ET

from metadata_translations import metadata_translations

SVG_FILE = Path("bg.svg")
OUTPUT_DIR = Path("output")
FONT_DIR = Path("fonts")

TITLE_FONT = "Libre Baskerville"
SUBTITLE_FONT = "Alexandria"

TITLE_SIZE_PT = 48
SUBTITLE_SIZE_PT = 24

TITLE_COLOR = "#FFFFFF"
SUBTITLE_COLOR = "#D3D3D3"

LEFT_MARGIN = 100
RIGHT_MARGIN = 100
VERTICAL_GAP = 40
TITLE_OFFSET_Y = 10
SUBTITLE_LINE_HEIGHT = 1.3


def get_svg_size(root):
    width = root.get("width")
    height = root.get("height")

    if width and height:
        return float(width.replace("px", "")), float(height.replace("px", ""))

    viewbox = root.get("viewBox")
    if viewbox:
        _, _, w, h = map(float, viewbox.split())
        return w, h

    raise ValueError("Could not determine SVG dimensions.")


def pt_to_px(pt):
    return pt * 96 / 72


def estimate_text_width(text, font_size_pt, avg_char_width_ratio=0.52):
    return len(text) * pt_to_px(font_size_pt) * avg_char_width_ratio


def wrap_text(text, max_width_px, font_size_pt):
    words = text.split()
    if not words:
        return []

    lines = []
    current = []

    for word in words:
        candidate = " ".join(current + [word])
        if estimate_text_width(candidate, font_size_pt) <= max_width_px or not current:
            current.append(word)
        else:
            lines.append(" ".join(current))
            current = [word]

    if current:
        lines.append(" ".join(current))

    return lines


def add_wrapped_text(parent, x, y, lines, font_size_pt, line_height, attrs):
    text = ET.SubElement(parent, "text")
    text.set("x", str(x))
    text.set("y", str(y))
    for key, value in attrs.items():
        text.set(key, value)

    line_step = font_size_pt * line_height
    for i, line in enumerate(lines):
        tspan = ET.SubElement(text, "tspan")
        tspan.set("x", str(x))
        if i > 0:
            tspan.set("dy", f"{line_step}pt")
        tspan.text = line

    return text


def add_font_faces(root, svg_ns):
    defs = root.find(f"{{{svg_ns}}}defs")
    if defs is None:
        defs = ET.SubElement(root, "defs")

    title_font = (FONT_DIR / "LibreBaskerville-VariableFont_wght.ttf").resolve().as_uri()
    subtitle_font = (FONT_DIR / "Alexandria-VariableFont_wght.ttf").resolve().as_uri()

    style = ET.SubElement(defs, "style")
    style.set("type", "text/css")
    style.text = f"""@font-face {{
  font-family: '{TITLE_FONT}';
  src: url('{title_font}');
  font-weight: 100 900;
}}
@font-face {{
  font-family: '{SUBTITLE_FONT}';
  src: url('{subtitle_font}');
  font-weight: 100 900;
}}"""


def generate_svg(title, subtitle, output_path):
    tree = ET.parse(SVG_FILE)
    root = tree.getroot()

    svg_ns = "http://www.w3.org/2000/svg"
    ET.register_namespace("", svg_ns)

    add_font_faces(root, svg_ns)

    width, height = get_svg_size(root)

    center_y = height / 2
    title_y = center_y - TITLE_OFFSET_Y
    subtitle_y = title_y + VERTICAL_GAP + SUBTITLE_SIZE_PT
    max_text_width = width - LEFT_MARGIN - RIGHT_MARGIN

    group = ET.Element("g")

    title_el = ET.SubElement(group, "text")
    title_el.set("x", str(LEFT_MARGIN))
    title_el.set("y", str(title_y))
    title_el.set("fill", TITLE_COLOR)
    title_el.set("font-family", f"'{TITLE_FONT}'")
    title_el.set("font-size", f"{TITLE_SIZE_PT}pt")
    title_el.set("font-weight", "700")
    title_el.text = title

    subtitle_lines = wrap_text(subtitle, max_text_width, SUBTITLE_SIZE_PT)
    add_wrapped_text(
        group,
        LEFT_MARGIN,
        subtitle_y,
        subtitle_lines,
        SUBTITLE_SIZE_PT,
        SUBTITLE_LINE_HEIGHT,
        {
            "fill": SUBTITLE_COLOR,
            "font-family": f"'{SUBTITLE_FONT}'",
            "font-size": f"{SUBTITLE_SIZE_PT}pt",
            "font-weight": "400",
        },
    )

    root.append(group)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    tree.write(output_path, encoding="utf-8", xml_declaration=True)


def svg_to_png(svg_path, png_path):
    png_path.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["rsvg-convert", "-o", str(png_path), str(svg_path)],
        check=True,
    )


def generate_image(title, subtitle, output_png_path):
    svg_path = output_png_path.with_suffix(".svg")
    generate_svg(title, subtitle, svg_path)
    svg_to_png(svg_path, output_png_path)
    svg_path.unlink()


def generate_all():
    for language, pages in metadata_translations.items():
        for page, content in pages.items():
            output_path = OUTPUT_DIR / language / page / "og.png"
            generate_image(content["title"], content["description"], output_path)
            print(f"Saved {output_path}")


if __name__ == "__main__":
    generate_all()
```

