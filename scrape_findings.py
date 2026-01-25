
import urllib.request
import re
import os
from html.parser import HTMLParser

BASE_URL = "https://radiationsafetynm.github.io/website/posts/inspection/inspection.html"
ROOT_URL = "https://radiationsafetynm.github.io/website"

# Mapping of section headers to our content categories
CATEGORY_MAP = {
    "교육훈련": "인허가/서류", # Approx mapping
    "면허자": "인허가/서류",
    "건강진단": "인력/조직",
    "기록비치": "인허가/서류",
    "안전관리규정": "인허가/서류",
    "선량ㆍ오염측정": "시설/보안", 
    "기술기준": "시설/보안",
    "변경허가": "인허가/서류",
    "자체처분": "폐기물",
    "폐기물": "폐기물",
    "시설검사": "시설/보안",
    "변경신고": "인허가/서류",
    "장비ㆍ인력": "장비/선원",
    "피폭관리": "인력/조직",
    "보고": "인허가/서류",
    "의료분야": "의료분야"
}

# Explicit overrides if needed
CATEGORY_OVERRIDES = {
    "종사자 신규교육 미실시": "인력/조직",
    "종사자 정기교육 미실시": "인력/조직",
    "면허자 보수교육 미이수": "인력/조직",
    "신규종사자 미실시": "인력/조직", # Health exam
    "종사자 미실시": "인력/조직",
    "퇴직자 미실시": "인력/조직",
    "기록비치 부적합": "인허가/서류",
    "안전관리규정 미준수": "인허가/서류",
    "표면오염도 측정 부적합": "시설/보안",
    "인체ㆍ물품오염도 미측정": "시설/보안",
    "선형가속기 품질관리 미이행": "장비/선원",
    "표지ㆍ주의사항 미게시": "시설/보안",
    "변경허가 미신청": "인허가/서류",
    "자체처분 부적합": "폐기물",
    "시설검사 미 수검": "시설/보안",
    "변경신고 미신고": "인허가/서류",
    "장비ㆍ인력 기준위반": "장비/선원",
    "피폭관리 부적합": "인력/조직",
    "보고, 검사 등 누락보고": "인허가/서류"
}

def get_html(url):
    try:
        with urllib.request.urlopen(url) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

class IndexParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.in_link = False
        self.current_href = None
        
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            for name, value in attrs:
                if name == 'href' and 'inspection/' in value and '.html' in value and 'inspection.html' not in value:
                    self.current_href = value
                    self.in_link = True

    def handle_endtag(self, tag):
        if tag == 'a':
            self.in_link = False

    def handle_data(self, data):
        if self.in_link and data.strip():
             # Resolve relative URL
             # The base is .../posts/inspection/inspection.html
             # Links are like: guidelines/guidelines.html or ../...
             
             # Actually, let's look at the scraped hrefs.
             # They are usually relative.
             full_url = urllib.parse.urljoin("https://radiationsafetynm.github.io/website/posts/inspection/", self.current_href)
             self.links.append({
                 'title': data.strip(),
                 'url': full_url
             })

def extract_content(html):
    # Very simple extraction: grab text between <h1> and first component or similar
    # Using regex for simplicity as we don't need perfect DOM parsing
    
    # Title: <h1>...</h1>
    title_match = re.search(r'<h1.*?>(.*?)</h1>', html, re.DOTALL)
    title = title_match.group(1).strip() if title_match else "Unknown Title"
    
    # Body: Simplified. Get text after h1.
    # We will strip script, style, nav, header, footer tags
    clean_html = re.sub(r'<(script|style|nav|header|footer).*?>.*?</\1>', '', html, flags=re.DOTALL)
    
    # Extract main content div if likely
    # Based on Quarto/Pandoc usually being 'main' or 'article'
    # Fallback to regex text extraction
    
    content = re.sub(r'<[^>]+>', '\n', clean_html)
    content = re.sub(r'\n+', '\n', content).strip()
    
    # Find the title in the content and start after it
    start_idx = content.find(title)
    if start_idx != -1:
        content = content[start_idx + len(title):].strip()
        
    # Cut off footer text like "On this page" if common
    end_idx = content.find("On this page")
    if end_idx != -1:
        content = content[:end_idx].strip()
        
    return title, content

def main():
    print(f"Fetching index: {BASE_URL}")
    index_html = get_html(BASE_URL)
    if not index_html:
        return

    parser = IndexParser()
    parser.feed(index_html)
    
    print(f"Found {len(parser.links)} links.")
    
    output_dir = "src/content/findings"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    # Clear existing mock items? No, let's overwrite or add.
    # The user probably wants these to Replace the mocks.
    # I will delete files starting with 'f' or just overwrite.
    
    for i, link in enumerate(parser.links):
        print(f"Processing ({i+1}/{len(parser.links)}): {link['title']}")
        sub_html = get_html(link['url'])
        if not sub_html:
            continue
            
        real_title, body_text = extract_content(sub_html)
        
        # Determine Category
        category = "인허가/서류" # Default
        if real_title in CATEGORY_OVERRIDES:
            category = CATEGORY_OVERRIDES[real_title]
        
        # Determine Filename
        slug = f"imported-{i+1:02d}-{real_title.replace(' ', '-').replace('/', '-')}"
        filename = f"{output_dir}/{slug}.md"
        
        # Formatting Markdown
        safe_desc = body_text[:100].replace("'", "").replace("\n", " ")
        md_content = f"""---
category: '{category}'
title: '{real_title}'
description: '{safe_desc}...'
violationClause: ''
solution: ''
---

{body_text}
"""
        with open(filename, "w", encoding="utf-8") as f:
            f.write(md_content)
            
    print("Done.")

if __name__ == "__main__":
    import urllib.parse
    main()
