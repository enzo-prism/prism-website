import os, re, json, sys

ROOTS = ["app","components","content","lib","utils","hooks"]
SKIP = {"content/wall-of-love-data.tsx"}
EXT = (".tsx",".ts",".mdx",".md",".json")
DASH = "—"

rows=[]
for root in ROOTS:
    for dirpath,dirnames,filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in ("node_modules",".next")]
        for fn in filenames:
            if not fn.endswith(EXT): continue
            p=os.path.join(dirpath,fn)
            try: lines=open(p,encoding="utf-8").read().split("\n")
            except Exception: continue
            if p in SKIP: continue
            for i,l in enumerate(lines,1):
                if DASH in l:
                    s=l.strip()
                    is_comment = s.startswith("//") or s.startswith("*") or s.startswith("/*") or s.startswith("{/*") or "/*" in s and "*/" in s and s.startswith("{")
                    rows.append({"file":p,"line":i,"comment":is_comment,"text":l.rstrip()})
print(json.dumps(rows,ensure_ascii=False))
