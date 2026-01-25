
import os
import re

SOURCE_DIR = "src/content/findings/inspection"
DEST_DIR = "src/content/findings"

# Map folder names to Main Categories
FOLDER_MAP = {
    "alteration_reporting": "인허가/서류",
    "dose_contamination_measurement": "시설/보안",
    "education_training": "인력/조직",
    "equipment_human_resources": "장비/선원",
    "exposure_control": "인력/조직",
    "facility_inspection": "시설/보안",
    "health_examination": "인력/조직",
    "license_amendment": "인허가/서류",
    "recording_keeping": "인허가/서류",
    "reporting": "인허가/서류",
    "safety_management_regulation": "인허가/서류",
    "self_disposal": "폐기물",
    "technical_criteria": "시설/보안"
}

def parse_frontmatter(content):
    match = re.search(r'^---\s+(.*?)\s+---', content, re.DOTALL)
    if not match:
        return {}, content
    
    fm_text = match.group(1)
    body = content[match.end():].strip()
    
    metadata = {}
    for line in fm_text.split('\n'):
        if ':' in line:
            key, val = line.split(':', 1)
            metadata[key.strip()] = val.strip().strip('"').strip("'")
            # simplified YAML parser
            if key.strip() == 'categories':
                # Remove brackets [ ]
                val = val.strip().strip('[]')
                metadata['categories'] = [x.strip() for x in val.split(',')]
                
    return metadata, body

def main():
    if not os.path.exists(DEST_DIR):
        os.makedirs(DEST_DIR)
        
    count = 0
    for root, dirs, files in os.walk(SOURCE_DIR):
        folder_name = os.path.basename(root)
        category = FOLDER_MAP.get(folder_name, "기타")
        
        for file in files:
            if not file.endswith(".qmd"):
                continue
                
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            metadata, body = parse_frontmatter(content)
            title = metadata.get('title', file.replace('.qmd', ''))
            
            # Clean body: Remove ### Title if it repeats
            body_lines = body.split('\n')
            if body_lines and body_lines[0].startswith('###') and title in body_lines[0]:
                body = '\n'.join(body_lines[1:]).strip()
            
            # Use first paragraph as description
            desc = body.split('\n\n')[0].replace('\n', ' ')
            if len(desc) > 100:
                desc = desc[:97] + "..."
            
            # Filename
            slug = f"migrated-{folder_name}-{file.replace('.qmd', '')}"
            dest_path = os.path.join(DEST_DIR, f"{slug}.md")
            
            md_content = f"""---
category: '{category}'
title: '{title}'
description: '{desc.replace("'", "")}'
violationClause: ''
solution: ''
---

{body}
"""
            with open(dest_path, 'w', encoding='utf-8') as f:
                f.write(md_content)
                
            count += 1
            print(f"Migrated: {title} ({category})")
            
    print(f"Total {count} files migrated.")

if __name__ == "__main__":
    main()
