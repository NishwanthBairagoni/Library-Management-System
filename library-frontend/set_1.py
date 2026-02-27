import os

def set_items_per_page_1(file_path):
    if not os.path.exists(file_path):
        print(f"Skip: {file_path}")
        return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    new_lines = []
    changed = False
    for line in lines:
        if 'const itemsPerPage' in line:
            # Replace the value with 1
            if ' = 10;' in line:
                line = line.replace(' = 10;', ' = 1;')
                changed = True
            elif ' = 2;' in line:
                line = line.replace(' = 2;', ' = 1;')
                changed = True
            elif ' = 3;' in line:
                line = line.replace(' = 3;', ' = 1;')
                changed = True
            elif ' = 5;' in line:
                line = line.replace(' = 5;', ' = 1;')
                changed = True
            elif '= useState(10)' in line:
                line = line.replace('= useState(10)', '= useState(1)')
                changed = True
            elif '= useState(3)' in line:
                line = line.replace('= useState(3)', '= useState(1)')
                changed = True
                
        new_lines.append(line)
        
    if changed:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f"Set itemsPerPage to 1 in: {file_path}")
    else:
        print(f"No match for itemsPerPage in: {file_path}")

files = [
    r'd:\Infosys-Project\library-frontend\src\pages\admin\AdminDashboard.jsx',
    r'd:\Infosys-Project\library-frontend\src\pages\student\StudentDashboard.jsx',
    r'd:\Infosys-Project\library-frontend\src\pages\Librarian\LibrarianDashboard.jsx',
    r'd:\Infosys-Project\library-frontend\src\pages\admin\MembershipManagement.jsx'
]

for f in files:
    set_items_per_page_1(f)
