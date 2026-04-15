import re

def check_balance(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    # Remove strings to avoid counting tags inside them
    content = re.sub(r'\"[^\"]*\"', '', content)
    content = re.sub(r'\'[^\']*\'', '', content)
    content = re.sub(r'`[^`]*`', '', content)
    # Remove comments
    content = re.sub(r'//.*', '', content)
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    # Remove self-closing tags
    content = re.sub(r'<[a-zA-Z0-9]+\s+[^>]*/>', '', content)
    
    # Count <div and </div
    opens = re.findall(r'<div(?![a-zA-Z0-9])', content)
    closes = re.findall(r'</div\s*>', content)
    
    print(f"Opens: {len(opens)}")
    print(f"Closes: {len(closes)}")
    
    if len(opens) != len(closes):
        print("Mismatch found!")
        # Try to find the first mismatch by tracking stack
        stack = []
        lines = content.split('\n')
        for i, line in enumerate(lines):
            # This is a bit simplified as multiple tags can be on one line
            tags = re.findall(r'<div(?![a-zA-Z0-9])|</div\s*>', line)
            for tag in tags:
                if tag.startswith('<div'):
                    stack.append(i + 1)
                else:
                    if not stack:
                        print(f"Extra closing tag at line {i + 1}")
                    else:
                        stack.pop()
        for s in stack:
            print(f"Unclosed opening tag from line {s}")

check_balance('src/components/HomeScreen.tsx')
