import os
import glob

for root, dirs, files in os.walk('/home/jnolly/Downloads/St.-Michael-s-Madende-catholic-parish-main/Backend'):
    if 'venv' in root or '.venv' in root: continue
    for file in files:
        if not file.endswith('.py') and not file.endswith('.txt'): continue
        filepath = os.path.join(root, file)
        
        try:
            with open(filepath, 'r') as f:
                lines = f.readlines()
        except: continue
        
        has_conflict = False
        new_lines = []
        state = 0 # 0 normal, 1 in HEAD, 2 in OTHER
        
        for line in lines:
            if line.startswith('<<<<<<< HEAD'):
                has_conflict = True
                state = 1
                continue
            elif line.startswith('======='):
                if state == 1:
                    state = 2
                    continue
            elif line.startswith('>>>>>>>'):
                if state == 2 or state == 1:
                    state = 0
                    continue
            
            if state == 0 or state == 1:
                new_lines.append(line)
                
        if has_conflict:
            print(f"Resolving {filepath}")
            with open(filepath, 'w') as f:
                f.writelines(new_lines)

