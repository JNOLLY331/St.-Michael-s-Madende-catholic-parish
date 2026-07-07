import os
import re

def fix_dynamic(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    if 'material-symbols-outlined' not in content:
        return

    original = content

    def replacer(match):
        pre = match.group(1)
        inner = match.group(2).strip()
        
        attrs = re.sub(r'\bmaterial-symbols-outlined\b\s*', '', pre)
        attrs = re.sub(r'className="\s*"', '', attrs)
        
        if inner.startswith('{') and inner.endswith('}'):
            expr = inner[1:-1].strip()
            # if expr is a ternary e.g. sidebarOpen ? 'menu_open' : 'menu'
            return f"<DynamicIcon name={{{expr}}}{attrs} />"
        else:
            # Maybe it is multiline text or a hardcoded string that regex didn't catch 
            return f'<DynamicIcon name="{inner}"{attrs} />'

    # match <span className="...material-symbols-outlined...">inner</span>
    # inner can be {icon} or text with newlines
    new_content = re.sub(r'<span([^>]*class(?:Name)?="[^"]*material-symbols-outlined[^"]*"[^>]*)>\s*(.*?)\s*</span>', replacer, content, flags=re.DOTALL)

    if new_content != original:
        import_stmt = "import DynamicIcon from '../components/DynamicIcon';\n"
        if filepath.startswith('src/components/'):
             import_stmt = "import DynamicIcon from './DynamicIcon';\n"
        
        # adjust relative path
        depth = filepath.count('/') - 1
        if filepath.startswith('src/pages/'):
             import_stmt = "import DynamicIcon from '../components/DynamicIcon';\n"
        if filepath.startswith('src/components/home/'):
             import_stmt = "import DynamicIcon from '../DynamicIcon';\n"

        import_regex = re.compile(r'^(import\s+.*?from\s+[\'"].*?[\'"];?)$', re.MULTILINE)
        matches = list(import_regex.finditer(new_content))
        if matches:
            last = matches[-1]
            new_content = new_content[:last.end()] + "\n" + import_stmt + new_content[last.end():]
        else:
            new_content = import_stmt + new_content

        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed dynamic in {filepath}")

for root, _, files in os.walk('src'):
    for f in files:
        if f.endswith('.jsx'):
            fix_dynamic(os.path.join(root, f))
