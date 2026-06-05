import sys, json
data = json.load(sys.stdin)
for job in data['jobs']:
    for step in job['steps']:
        print(f"  Step {step['number']}: {step['name']} -> {step['conclusion']} ({step['status']})")
        if step['conclusion'] == 'failure':
            print(f"    FAILED: {step['name']}")
