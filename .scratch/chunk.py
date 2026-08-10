import json,sys
r=[x for x in json.load(open('.scratch/inv.json')) if not x['comment']]
a,b=int(sys.argv[1]),int(sys.argv[2])
print(f"# remaining total: {len(r)}", file=sys.stderr)
for x in r[a:b]:
    print(json.dumps({"file":x['file'],"line":x['line'],"old":x['text']},ensure_ascii=False))
