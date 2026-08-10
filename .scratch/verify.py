import os,re,sys
ROOTS=["app","components","content","lib","utils","hooks"]
EXT=(".tsx",".ts",".mdx",".md",".json")
ALLOW={("lib/seo/rules.ts",),}
hits=[]
for root in ROOTS:
    for dp,dn,fn in os.walk(root):
        dn[:]=[d for d in dn if d not in ("node_modules",".next")]
        for f in fn:
            if not f.endswith(EXT): continue
            p=os.path.join(dp,f)
            src=open(p,encoding="utf-8").read()
            if "—" not in src: continue
            if p=="lib/seo/rules.ts": continue
            if p.endswith((".ts",".tsx")):
                s=re.sub(r"/\*.*?\*/","",src,flags=re.S)
                s="\n".join(re.sub(r"//.*$","",l) for l in s.split("\n"))
            else: s=src
            for i,l in enumerate(s.split("\n"),1):
                if "—" in l: hits.append((p,i,l.strip()[:120]))
print("non-comment em dashes remaining:",len(hits))
for h in hits: print(f"  {h[0]}:{h[1]}  {h[2]}")
