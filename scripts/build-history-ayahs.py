#!/usr/bin/env python3
"""
Kitaplar we pygamberler bölümindäki esasy aýatlaryň (keyAyah) arapça tekstini
`quran-json` paketinden alyp, src/data/history-ayahs.json faýlyna ýazýar.

Ulanylyşy:
  python3 scripts/build-history-ayahs.py /tmp/qj/package/dist
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCES = [ROOT / "src" / "data" / "books.ts", ROOT / "src" / "data" / "prophets.ts"]
OUT = ROOT / "src" / "data" / "history-ayahs.json"


def main(dist: str) -> None:
    quran = json.loads((pathlib.Path(dist) / "quran.json").read_text("utf-8"))
    refs: list[str] = []
    for src in SOURCES:
        refs += re.findall(r"keyAyah: \{\s*ref: '(\d+:\d+(?:-\d+)?)'", src.read_text("utf-8"))
    out: dict[str, str] = {}
    for ref in refs:
        surah, rng = ref.split(":")
        start, _, end = rng.partition("-")
        for ayah in range(int(start), int(end or start) + 1):
            text = quran[int(surah) - 1]["verses"][ayah - 1]["text"].strip()
            # Bölüm belgisi (۞) aýatyň bir bölegi däl — aýyrýarys
            out[f"{surah}:{ayah}"] = text.replace("۞", "").strip()
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", "utf-8")
    print(f"{len(refs)} salgy, {len(out)} aýat → {OUT}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    main(sys.argv[1])
