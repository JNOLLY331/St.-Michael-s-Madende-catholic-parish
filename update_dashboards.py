import re

def update_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Remove all blue, purple, yellow, green, pink, red tailwind classes
    content = re.sub(r'bg-blue-\d+(/\d+)?', 'bg-[#570013]', content)
    content = re.sub(r'bg-purple-\d+(/\d+)?', 'bg-[#ffe088]', content)
    content = re.sub(r'bg-green-\d+(/\d+)?', 'bg-gray-800', content)
    content = re.sub(r'bg-yellow-\d+(/\d+)?', 'bg-[#ffe088]', content)
    content = re.sub(r'bg-pink-\d+(/\d+)?', 'bg-[#570013]', content)
    
    content = re.sub(r'text-blue-\d+(/\d+)?', 'text-[#570013]', content)
    content = re.sub(r'text-purple-\d+(/\d+)?', 'text-[#570013]', content)
    content = re.sub(r'text-green-\d+(/\d+)?', 'text-gray-800', content)
    content = re.sub(r'text-yellow-\d+(/\d+)?', 'text-[#570013]', content)
    content = re.sub(r'text-pink-\d+(/\d+)?', 'text-[#570013]', content)
    content = re.sub(r'text-red-\d+(/\d+)?', 'text-[#570013]', content)

    # 2. Fix text colors matching issues
    # the welcome text should be white since the banner is maroon
    content = content.replace('text-gray-900', 'text-gray-900')
    content = content.replace('text-[#570013] font-bold text-3xl mb-2', 'text-white font-bold text-3xl mb-2')
    content = content.replace('Peace be with you, <span className="text-[#570013]">', 'Peace be with you, <span className="text-[#ffe088]">')
    content = content.replace('bg-gradient-to-r from-[#570013] to-[#570013]', 'bg-gradient-to-r from-[#570013] to-[#40000b] text-white')
    content = content.replace('<p className="text-gray-900/60 text-sm max-w-xl">', '<p className="text-white/80 text-sm max-w-xl">')
    
    # In AdminDashboard "Welcome back" banner
    content = content.replace('text-[#ffe088]/80 text-[#570013] font-bold text-3xl', 'text-white font-bold text-3xl')
    
    # 3. Avatar
    content = content.replace('bg-[#570013] border-2 border-[#570013] flex', 'bg-[#570013] border-2 border-[#ffe088] flex')
    content = content.replace('<MdPerson className="text-gray-900 text-base" />', '<MdPerson className="text-[#ffe088] text-base" />')

    # 4. Active tabs in sidebar
    # "bg-[#570013] text-gray-900 border-r-4 border-[#570013]" -> we want it to look good on white bg
    content = content.replace("bg-[#570013] text-gray-900 border-r-4 border-[#570013]", "bg-[#570013]/10 text-[#570013] border-r-4 border-[#570013]")
    content = content.replace("bg-[#570013] text-white border-r-4 border-[#ffe088]", "bg-[#570013]/10 text-[#570013] border-r-4 border-[#570013]")
    
    # Quick Links
    content = content.replace('bg-[#ffe088]/30', 'bg-[#ffe088]/30')
    content = content.replace('bg-[#570013]/30', 'bg-[#570013]/10')
    
    # Replace any text-[#570013] inside the white cards back to appropriate color if needed
    
    # DashStatCard rendering
    # If the card has a light background, we want white text
    # The script replaces bgColor mappings. We can fix the array directly.
    content = content.replace("color: 'bg-[#570013]', bgColor: 'bg-[#570013]'", "color: 'bg-[#40000b]', bgColor: 'bg-[#570013]'")
    
    # Button colors
    content = content.replace('hover:bg-[#570013]', 'hover:opacity-80')
    
    with open(filepath, 'w') as f:
        f.write(content)

update_file("Frontend/src/pages/ParishionerDashboard.jsx")
update_file("Frontend/src/pages/AdminDashboard.jsx")
print("Done")
