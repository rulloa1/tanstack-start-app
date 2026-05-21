import os

replacements = {
    '?o': '"',
    '??': '"',
    '?"': '—',
    '?': '•',
    'Ac ': '© ',
}

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            original = content
            for k, v in replacements.items():
                content = content.replace(k, v)
            if content != original:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
