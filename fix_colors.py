import os

files = ["Frontend/src/pages/AdminDashboard.jsx", "Frontend/src/pages/ParishionerDashboard.jsx"]

for path in files:
    with open(path, "r") as f:
        content = f.read()

    # Change main container
    content = content.replace('bg-[#0d0a07]', 'bg-gray-100')
    content = content.replace('bg-[#1a1208]', 'bg-white')
    content = content.replace('border-white/10', 'border-gray-200')
    content = content.replace('bg-white/5', 'bg-gray-100/50')
    
    # Text colors
    content = content.replace('text-white', 'text-gray-900')
    content = content.replace('text-white/60', 'text-gray-600')
    content = content.replace('text-white/50', 'text-gray-500')
    content = content.replace('text-white/40', 'text-gray-400')
    content = content.replace('text-white/30', 'text-gray-300')
    content = content.replace('text-white/20', 'text-gray-200')
    content = content.replace('bg-white/10', 'bg-gray-200')
    
    # Fonts
    content = content.replace('font-oswald', 'font-sans') 
    
    # Arial font on main wrapper
    content = content.replace('className="flex min-h-screen bg-gray-100 text-gray-900 font-sans"', 'className="flex min-h-screen bg-gray-100 text-gray-900" style={{ fontFamily: "Arial, sans-serif" }}')
    
    with open(path, "w") as f:
        f.write(content)
print("Done")
