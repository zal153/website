import fs from "node:fs/promises";
import path from "node:path";
import convert from "heic-convert";
import sharp from "sharp";

const dir = "public/img";

for (const name of await fs.readdir(dir)) {
    if (!/\.(jpe?g|heic|heif)$/i.test(name)) continue;
    const file = path.join(dir, name);
    const input = await fs.readFile(file);

    // cek signature: HEIC ditandai "ftyp" + brand heic/heix/mif1 di byte 4-12
    const head = input.subarray(4, 12).toString("ascii");
    const isHeic = /ftyp(heic|heix|hevc|mif1|heim|heis)/.test(head);

    let jpg;
    if (isHeic) {
        jpg = Buffer.from(await convert({ buffer: input, format: "JPEG", quality: 0.85 }));
    } else {
        jpg = input;
    }

    // rotasi + resize + kompres
    const out = await sharp(jpg)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .jpeg({ quality: 82 })
        .toBuffer();

    const target = path.join(dir, name.replace(/\.(heic|heif)$/i, ".jpg"));
    await fs.writeFile(target, out);
    console.log(isHeic ? "HEIC -> JPG:" : "dioptimalkan:", target);
}