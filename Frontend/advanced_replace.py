import os
import re

def to_pascal_case(snake_str):
    components = snake_str.strip().split('_')
    return "Md" + "".join(x.title() for x in components)

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # match static <span className="material-symbols-outlined...">icon_name</span>
    used_icons = set()

    def replacer_static(match):
        pre = match.group(1)
        icon_name = match.group(2).strip()
        if not re.match(r'^[a-z0-9_]+$', icon_name):
            return match.group(0) # skip dynamic like {icon}
        
        comp = to_pascal_case(icon_name)
        used_icons.add(comp)
        
        attrs = re.sub(r'\bmaterial-symbols-outlined\b\s*', '', pre)
        attrs = re.sub(r'className="\s*"', '', attrs)
        return f"<{comp}{attrs} />"

    new_content = re.sub(r'<span([^>]*class(?:Name)?="[^"]*material-symbols-outlined[^"]*"[^>]*)>\s*([a-z0-9_]+)\s*</span>', replacer_static, content)

    if new_content != content and used_icons:
        imports_added = f"import {{ {', '.join(sorted(list(used_icons)))} }} from 'react-icons/md';\n"
        import_regex = re.compile(r'^(import\s+.*?from\s+[\'"].*?[\'"];?)$', re.MULTILINE)
        matches = list(import_regex.finditer(new_content))
        if matches:
            last = matches[-1]
            new_content = new_content[:last.end()] + "\n" + imports_added + new_content[last.end():]
        else:
            new_content = imports_added + new_content

        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed static in {filepath}")

for root, _, files in os.walk('src'):
    for f in files:
        if f.endswith('.jsx'):
            fix_file(os.path.join(root, f))
