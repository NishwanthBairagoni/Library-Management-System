import sys
path = 'src/pages/admin/AdminDashboard.jsx'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if '#8b5cf6' in line and '15px' in line:
        lines[i] = line.replace('#8b5cf6', '#ef4444')

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
