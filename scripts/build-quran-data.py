#!/usr/bin/env python3
"""
Süre JSON faýllaryny döredýär: src/data/quran/surah-XXX.json

Arapça tekst: `quran-json` npm paketi (Uthmani, The Noble Qur'an Encyclopedia,
CC BY-SA 4.0). Türkmençe many: scripts/translations-tk.json.

Ulanylyşy:
  mkdir -p /tmp/qj && curl -sL https://registry.npmjs.org/quran-json/-/quran-json-3.1.2.tgz | tar xz -C /tmp/qj
  python3 scripts/build-quran-data.py /tmp/qj/package/dist
"""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "data" / "quran"


def main(dist: str) -> None:
    dist_path = pathlib.Path(dist)
    tk = json.loads((ROOT / "scripts" / "translations-tk.json").read_text("utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    index = []
    for sid_str, tr in sorted(tk.items(), key=lambda kv: int(kv[0])):
        sid = int(sid_str)
        src = json.loads((dist_path / "chapters" / f"{sid}.json").read_text("utf-8"))
        verses = src["verses"]
        if len(verses) != len(tr["ayahs"]):
            raise SystemExit(f"Süre {sid}: aýat sany gabat gelmeýär ({len(verses)} != {len(tr['ayahs'])})")
        meta = {
            "id": sid,
            "nameArabic": src["name"],
            "nameTranslit": src["transliteration"],
            "nameTurkmen": tr["name"],
            "revelation": "mekke" if src["type"] == "meccan" else "medine",
            "totalAyahs": src["total_verses"],
        }
        surah = {
            **meta,
            "ayahs": [
                {"number": v["id"], "arabic": v["text"].strip(), "turkmen": t}
                for v, t in zip(verses, tr["ayahs"])
            ],
        }
        (OUT / f"surah-{sid:03d}.json").write_text(
            json.dumps(surah, ensure_ascii=False, indent=2) + "\n", "utf-8"
        )
        index.append(meta)
    (OUT / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=2) + "\n", "utf-8")
    print(f"{len(index)} süre ýazyldy → {OUT}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    main(sys.argv[1])
