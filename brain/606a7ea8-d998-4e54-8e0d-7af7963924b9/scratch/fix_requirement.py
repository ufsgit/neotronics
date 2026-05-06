
import os

file_path = r'c:\Users\nanda\OneDrive\Desktop\UFS PROJECT\netronics\frontend\src\app\modules\admin\Requirement\Requirement.component.ts'

with open(file_path, 'r') as f:
    lines = f.readlines()

# We want to delete lines 621 to 815 (1-indexed)
# In 0-indexed, that's lines 620 to 814
start_del = 620
end_del = 815

new_lines = lines[:start_del] + lines[end_del:]

with open(file_path, 'w') as f:
    f.writelines(new_lines)

print(f"Deleted lines {start_del+1} to {end_del}. Total lines remaining: {len(new_lines)}")
