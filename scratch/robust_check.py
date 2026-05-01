import re

def check_balance(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()
    
    content = "".join(lines)
    # Remove all types of strings carefully
    content = re.sub(r'`[\s\S]*?`', lambda m: '`' + ' ' * (len(m.group(0)) - 2) + '`', content)
    content = re.sub(r'"[^"\n]*?"', lambda m: '"' + ' ' * (len(m.group(0)) - 2) + '"', content)
    content = re.sub(r"'[^'\n]*?'", lambda m: "'" + ' ' * (len(m.group(0)) - 2) + "'", content)
    
    # Remove comments
    content = re.sub(r'//.*', lambda m: ' ' * len(m.group(0)), content)
    content = re.sub(r'/\*[\s\S]*?\*/', lambda m: ' ' * len(m.group(0)), content)
    
    # Remove self-closing tags
    content = re.sub(r'<[a-zA-Z0-9]+\s+[^>]*/>', lambda m: ' ' * len(m.group(0)), content)
    
    new_lines = content.split('\n')
    stack = []
    for i, line in enumerate(new_lines):
        # Find all <div and </div
        tags = re.findall(r'<div(?![a-zA-Z0-9])|</div\s*>', line)
        for tag in tags:
            if tag.startswith('<div'):
                stack.append(i + 1)
            else:
                if not stack:
                    print(f"Extra closing </div> at line {i + 1}")
                else:
                    stack.pop()
    
    for s in stack:
        print(f"Unclosed opening <div> from line {s}")

print("Checking src/components/HomeScreen.tsx...")
check_balance('src/components/HomeScreen.tsx')
