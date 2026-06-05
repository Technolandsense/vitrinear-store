import sys, json
runs = json.load(sys.stdin)['workflow_runs']
for r in runs:
    sha = r['head_sha'][:7]
    print(f"Run #{r['run_number']}: sha={sha} event={r['event']} conclusion={r['conclusion']}")
