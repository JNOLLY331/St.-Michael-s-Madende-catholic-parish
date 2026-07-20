import os

files = [
    '/home/jnolly/Downloads/St.-Michael-s-Madende-catholic-parish-main/Backend/events/admin.py',
    '/home/jnolly/Downloads/St.-Michael-s-Madende-catholic-parish-main/Backend/accounts/views.py',
    '/home/jnolly/Downloads/St.-Michael-s-Madende-catholic-parish-main/Backend/accounts/urls.py',
    '/home/jnolly/Downloads/St.-Michael-s-Madende-catholic-parish-main/Backend/config/settings.py',
    '/home/jnolly/Downloads/St.-Michael-s-Madende-catholic-parish-main/Backend/sacraments/models.py',
    '/home/jnolly/Downloads/St.-Michael-s-Madende-catholic-parish-main/Backend/sacraments/serializers/sacrament.py',
    '/home/jnolly/Downloads/St.-Michael-s-Madende-catholic-parish-main/Backend/requirements.txt',
]

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r') as f:
        lines = f.readlines()
        
    out = []
    state = "normal"
    for line in lines:
        if line.startswith("<<<<<<< HEAD"):
            state = "head"
        elif line.startswith("======="):
            state = "incoming"
        elif line.startswith(">>>>>>> "):
            state = "normal"
        else:
            if state == "normal" or state == "head":
                out.append(line)
                
    with open(filepath, 'w') as f:
        f.writelines(out)

