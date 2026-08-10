import json,sys
r=json.load(open('.scratch/inv.json'))
pat=sys.argv[1]
for x in r:
    if x['comment']: continue
    if pat in x['file']:
        print(json.dumps({"file":x['file'],"line":x['line'],"old":x['text']},ensure_ascii=False))
