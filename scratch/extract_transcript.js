const fs = require('fs');

const transcriptPath = 'C:/Users/nanda/.gemini/antigravity-ide/brain/eeac3c36-2bc4-4326-81e0-398a8b78e8ab/.system_generated/logs/transcript.jsonl';
const t = fs.readFileSync(transcriptPath, 'utf8');

const startStr = 'Showing lines 1 to 800\\nThe following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.\\n';

const startIndex = t.indexOf(startStr);
if (startIndex === -1) {
    console.log('Start string not found');
    process.exit(1);
}

const linesAfter = t.substring(startIndex + startStr.length);
const endIndex = linesAfter.indexOf('The above content shows the entire, complete file contents');
let viewFileContent;
if (endIndex === -1) {
    // maybe it got truncated or didn't show the end message
    // just extract until the end of the JSON string or next quote
    const possibleEnd = linesAfter.indexOf('"},"status"');
    if (possibleEnd !== -1) {
        viewFileContent = linesAfter.substring(0, possibleEnd);
    } else {
        viewFileContent = linesAfter.substring(0, 50000); // fallback
    }
} else {
    viewFileContent = linesAfter.substring(0, endIndex);
}

// Unescape JSON string newlines
viewFileContent = viewFileContent.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');

const outputLines = viewFileContent.split('\n');
const extractedLines = [];
const regex = /^(\d+):\s(.*)$/;

for (const line of outputLines) {
    const match = line.match(regex);
    if (match) {
        extractedLines.push(match[2]);
    } else {
        // if it doesn't match the line number format, maybe it's a wrapped line
        extractedLines.push(line);
    }
}

fs.writeFileSync('scratch/original_first_800.txt', extractedLines.join('\n'), 'utf8');
console.log('Successfully extracted ' + extractedLines.length + ' lines.');
