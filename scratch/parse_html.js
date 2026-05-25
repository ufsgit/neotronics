const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../frontend/src/app/modules/admin/Purchase_Order/Purchase_Order.component.html');
const content = fs.readFileSync(htmlPath, 'utf8');

// A simple regex to find divs and comments
const tagRegex = /(<!--[\s\S]*?-->|<\/?div\b[^>]*>)/g;
let match;
const stack = [];
let line = 1;

// Helper to count lines
function getLineNumber(index) {
    return content.substring(0, index).split('\n').length;
}

const matches = [];
while ((match = tagRegex.exec(content)) !== null) {
    matches.push({
        text: match[0],
        index: match.index,
        line: getLineNumber(match.index)
    });
}

console.log("Found", matches.length, "div tags/comments");

for (const m of matches) {
    if (m.text.startsWith('<!--')) {
        // Skip comments
        continue;
    }
    if (m.text.startsWith('<div')) {
        stack.push(m);
    } else if (m.text.startsWith('</div')) {
        if (stack.length === 0) {
            console.log(`ERROR: Unexpected closing div at line ${m.line}: ${m.text}`);
        } else {
            const popped = stack.pop();
            // console.log(`Matched <div line ${popped.line}> with </div line ${m.line}>`);
        }
    }
}

if (stack.length > 0) {
    console.log("Unclosed divs remaining at the end of parsing:");
    for (const openDiv of stack) {
        console.log(`- <div line ${openDiv.line}>: ${openDiv.text}`);
    }
} else {
    console.log("No unclosed divs!");
}
