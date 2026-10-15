from PIL import Image, ImageDraw
from pathlib import Path

path = Path(r"c:\laragon\www\TRABAJO SEGURIDAD\assets\images\image1.png")
backup = path.with_name("image1_original.png")
im = Image.open(path).convert("RGBA")
w, h = im.size
print("size", w, h)

if not backup.exists():
    im.save(backup)
    print("backup saved", backup)

# Sample navy background near top-left
bg = im.getpixel((20, 20))[:3]
print("bg", bg)

pixels = im.load()
light = []
for y in range(max(0, h - 100), h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if r + g + b > 320:
            light.append((x, y))
print("light bottom", len(light))
if light:
    xs = [p[0] for p in light]
    ys = [p[1] for p in light]
    print("bottom bbox", min(xs), min(ys), max(xs), max(ys))

# Cover baked title on left (keep robot on right)
# Cover Gemini / watermark bands at bottom
draw = ImageDraw.Draw(im)

# Left text block: approx first 52% width, upper-mid area
draw.rectangle([0, 0, int(w * 0.52), h], fill=bg + (255,))

# Bottom strip for Gemini watermark (full width, safer)
draw.rectangle([0, int(h * 0.92), w, h], fill=bg + (255,))

out = path
im.convert("RGB").save(out, "PNG")
print("cleaned", out)
