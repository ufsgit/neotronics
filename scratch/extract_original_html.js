const fs = require('fs');

const lines = fs.readFileSync('C:/Users/nanda/.gemini/antigravity-ide/brain/eeac3c36-2bc4-4326-81e0-398a8b78e8ab/.system_generated/logs/transcript.jsonl', 'utf8').split('\n');
let viewFileOutput = '';
for (const line of lines) {
    if (line.includes('"type":"TOOL_RESPONSE"') && line.includes('Quotation.component.html') && line.includes('Showing lines 1 to 800')) {
        try {
            const obj = JSON.parse(line);
            viewFileOutput = obj.content;
            break;
        } catch (e) {
            console.error(e);
        }
    }
}

if (!viewFileOutput) {
    console.error('Could not find tool response');
    process.exit(1);
}

const linesOutput = viewFileOutput.split('\n');
let originalHtml = '';
for (let line of linesOutput) {
    // line matches: <line_number>: <content>
    const match = line.match(/^(\d+): (.*)$/);
    if (match) {
        originalHtml += match[2] + '\n';
    } else if (line.match(/^(\d+):$/)) {
        originalHtml += '\n'; // empty line
    }
}

fs.writeFileSync('scratch/original_first_800.html', originalHtml, 'utf8');
console.log('Successfully wrote scratch/original_first_800.html');
