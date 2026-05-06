from pathlib import Path

root = Path('frontend/src')
changed = []
for path in root.rglob('*.html'):
    text = path.read_text(encoding='utf-8')
    if '(click)="Save_' in text and 'type="submit"' in text:
        new = text.replace('type="submit"', 'type="button"')
        if new != text:
            path.write_text(new, encoding='utf-8')
            changed.append(str(path))
print('Modified files:', len(changed))
for f in changed:
    print(f)
