import json,sys
edits={}
for raw in sys.stdin:
    raw=raw.strip()
    if not raw: continue
    e=json.loads(raw); edits.setdefault(e["file"],[]).append(e)
errs=[];n=0
for f,es in edits.items():
    s=open(f,encoding="utf-8").read()
    for e in es:
        c=s.count(e["old"])
        want=e.get("count",1)
        if c!=want:
            errs.append(f"COUNT={c} want={want} {f}: {e['old'][:80]!r}"); continue
        if "—" in e["new"]:
            errs.append(f"STILL-DASH {f}: {e['new'][:60]!r}"); continue
        s=s.replace(e["old"],e["new"]); n+=c
    open(f,"w",encoding="utf-8").write(s)
if errs: print("\n".join(errs)); sys.exit(1)
print(f"replaced {n} across {len(edits)} files")
