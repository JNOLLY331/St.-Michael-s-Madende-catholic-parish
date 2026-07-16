import os

files = ["Frontend/src/pages/AdminDashboard.jsx", "Frontend/src/pages/ParishionerDashboard.jsx"]

for path in files:
    with open(path, "r") as f:
        content = f.read()

    content = content.replace('border-white/30', 'border-gray-300')
    content = content.replace('hover:bg-white/10', 'hover:bg-gray-200')
    content = content.replace('hover:bg-white/5', 'hover:bg-gray-100')
    content = content.replace('placeholder:text-gray-300', 'placeholder:text-gray-400')
    content = content.replace('divide-white/5', 'divide-gray-200')
    
    with open(path, "w") as f:
        f.write(content)
print("Done again")
