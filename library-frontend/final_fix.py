import os

def fix_pagination_visibility(file_path, search_pattern):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We use a broad search pattern to find the condition line
    # and replace the condition itself with 'true'
    # For example: '{approvedUsers.length > itemsPerPage && (' -> '{true && ('
    
    new_content = content
    # Find all instances of something.length > itemsPerPage && (
    # We'll use a regex that matches the core logic regardless of leading space
    import re
    
    # This regex looks for { followed by something then .length > itemsPerPage && (
    # But we should be careful.
    
    # Let's try to match exactly what grep found but more flexibly
    # {approvedUsers.length > itemsPerPage && (
    
    target_patterns = [
        r'\{\s*approvedUsers\.length\s*>\s*itemsPerPage\s*&&\s*\(',
        r'\{\s*pendingUsers\.length\s*>\s*itemsPerPage\s*&&\s*\(',
        r'\{\s*filteredBooks\.length\s*>\s*itemsPerPage\s*&&\s*\(',
        r'\{\s*history\.length\s*>\s*itemsPerPage\s*&&\s*\(',
        r'\{\s*activeBorrows\.length\s*>\s*itemsPerPage\s*&&\s*\(',
        r'\{\s*plans\.length\s*>\s*itemsPerPage\s*&&\s*\('
    ]
    
    for p in target_patterns:
        new_content = re.sub(p, '{true && (', new_content)
        
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Patched: {file_path}")
    else:
        print(f"No match for patterns in: {file_path}")

files = [
    r'd:\Infosys-Project\library-frontend\src\pages\admin\AdminDashboard.jsx',
    r'd:\Infosys-Project\library-frontend\src\pages\student\StudentDashboard.jsx',
    r'd:\Infosys-Project\library-frontend\src\pages\admin\MembershipManagement.jsx'
]

for f in files:
    fix_pagination_visibility(f, "")
