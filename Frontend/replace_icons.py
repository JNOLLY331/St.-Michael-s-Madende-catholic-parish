import os
import re
import glob

def to_pascal_case(snake_str):
    components = snake_str.strip().split('_')
    return "Md" + "".join(x.title() for x in components)

import_regex = re.compile(r'^(import\s+.*?from\s+[\'"].*?[\'"];?)$', re.MULTILINE)

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'material-symbols-outlined' not in content:
        return
        
    original = content
    used_icons = set()

    def replacer(match):
        attrs = match.group(1) or ""
        iconName = match.group(2).strip()
        
        # Remove material-symbols-outlined from className safely
        attrs = re.sub(r'\bmaterial-symbols-outlined\b\s*', '', attrs)
        # Cleanup empty classNames
        attrs = re.sub(r'className="\s*"', '', attrs)
        
        comp_name = to_pascal_case(iconName)
        used_icons.add(comp_name)
        
        return f"<{comp_name}{attrs} />"

    new_content = re.sub(r'<span([^>]*class(?:Name)?="[^"]*material-symbols-outlined[^"]*"[^>]*)>([a-z_]+)</span>', replacer, content)

    if original != new_content and used_icons:
        imports_added = f"import {{ {', '.join(sorted(list(used_icons)))} }} from 'react-icons/md';\n"
        
        matches = list(import_regex.finditer(new_content))
        if matches:
            last = matches[-1]
            new_content = new_content[:last.end()] + "\n" + imports_added + new_content[last.end():]
        else:
            new_content = imports_added + new_content

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for f in files:
        if f.endswith(('.jsx', '.js', '.tsx')):
            process_file(os.path.join(root, f))
