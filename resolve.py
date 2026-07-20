import os
import re

files_with_conflicts = [
    'events/admin.py',
    'accounts/views.py',
    'sacraments/models.py',
    'sacraments/serializers/sacrament.py',
    'requirements.txt'
]

def resolve_file(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r') as f:
        content = f.read()

    # Pattern to capture everything from <<<<<<< HEAD to ======= and drop everything else until >>>>>>>
    pattern = re.compile(r'<<<<<<< HEAD\n(.*?)\n=======\n(?:.*?)\n>>>>>>> [a-f0-9]+', re.DOTALL)
    
    new_content = pattern.sub(r'\1', content)
    
    with open(filepath, 'w') as f:
        f.write(new_content)

for filepath in files_with_conflicts:
    resolve_file(filepath)

