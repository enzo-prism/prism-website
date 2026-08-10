import json,sys
edits={}
for raw in sys.stdin:
    raw=raw.strip()
    if not raw: continue
    e=json.loads(raw)
    edits.setdefault(e["file"],[]).append(e)
errs=[];n=0
for f,es in edits.items():
    lines=open(f,encoding="utf-8").read().split("\n")
    for e in es:
        i=e["line"]-1
        cur=lines[i]
        if "—" not in cur:
            errs.append(f"NO-DASH-AT {f}:{e['line']}  cur={cur!r}"); continue
        if "—" in e["new"]:
            errs.append(f"STILL-DASH {f}:{e['line']}"); continue
        lines[i]=e["new"]; n+=1
    open(f,"w",encoding="utf-8").write("\n".join(lines))
if errs: print("\n".join(errs)); sys.exit(1)
print(f"applied {n} edits across {len(edits)} files")
