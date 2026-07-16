import re

def fix(filepath, imports_needed=False):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content

    def replacer(match):
        pre = match.group(1)
        inner = match.group(2).strip()
        
        attrs = pre.replace('material-symbols-outlined', '').strip()
        
        if inner.startswith('{') and inner.endswith('}'):
            expr = inner[1:-1].strip()
            return f"<DynamicIcon name={{{expr}}} className={{{attrs}}} />"
        else:
            return f'<DynamicIcon name="{inner}" className={{{attrs}}} />'

    # match <span className={`material-symbols-outlined ...`}>inner</span>
    new_content = re.sub(r'<span\s+className=\{`\s*material-symbols-outlined\s*([^`]*?)`\}([^\>]*)>\s*(.*?)\s*</span>', replacer, content, flags=re.DOTALL)

    if new_content != original:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed template in {filepath}")

fix('src/components/Navbar.jsx')
fix('src/components/BottomNav.jsx')
fix('src/pages/Dashboard.jsx')

