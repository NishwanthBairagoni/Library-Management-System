import os

def patch_pagination(file_path):
    if not os.path.exists(file_path):
        print(f"Skip: {file_path}")
        return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    new_lines = []
    changed = False
    
    for line in lines:
        new_line = line
        if '.length > itemsPerPage && (' in line:
            # Find the start of the condition after {
            start_idx = line.find('{') + 1
            end_idx = line.find('&& (')
            if start_idx > 0 and end_idx > start_idx:
                new_line = line[:start_idx] + "true " + line[end_idx:]
                changed = True
        elif 'totalPages <= 1) return null;' in line:
             new_line = line.replace('totalPages <= 1) return null;', 'false) return null;')
             changed = True
        
        new_lines.append(new_line)
        
    if changed:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f"Patched: {file_path}")
    else:
        print(f"No changes in: {file_path}")

files = [
    r'd:\Infosys-Project\library-frontend\src\pages\admin\AdminDashboard.jsx',
    r'd:\Infosys-Project\library-frontend\src\pages\student\StudentDashboard.jsx',
    r'd:\Infosys-Project\library-frontend\src\pages\Librarian\LibrarianDashboard.jsx',
    r'd:\Infosys-Project\library-frontend\src\pages\admin\MembershipManagement.jsx'
]

for f in files:
    patch_pagination(f)
