import os

def set_2(path):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Very aggressive replacement
    import re
    # Match any itemsPerPage = [digits];
    new_content = re.sub(r'itemsPerPage\s*=\s*\d+', 'itemsPerPage = 2', content)
    # Match any useState([digits]) if it's for itemsPerPage
    new_content = re.sub(r'useState\((\d+)\)(\s*;\s*//\s*itemsPerPage|.*itemsPerPage)', 'useState(2)', new_content)
    
    # Specific fix for MembershipManagement
    if 'MembershipManagement.jsx' in path:
        new_content = re.sub(r'const\s*itemsPerPage\s*=\s*\d+', 'const itemsPerPage = 2', new_content)

    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Patched: {path}")
    else:
        print(f"No match: {path}")

files = [
    r'd:\Infosys-Project\library-frontend\src\pages\admin\AdminDashboard.jsx',
    r'd:\Infosys-Project\library-frontend\src\pages\student\StudentDashboard.jsx',
    r'd:\Infosys-Project\library-frontend\src\pages\Librarian\LibrarianDashboard.jsx',
    r'd:\Infosys-Project\library-frontend\src\pages\admin\MembershipManagement.jsx'
]

for f in files:
    set_2(f)
