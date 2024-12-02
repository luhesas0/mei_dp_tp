const fs = require('fs');

function saveJSON(data, filename) {
    const jsonData = data.map((row, index) => ({ id: index + 1, ...row }));
    fs.writeFileSync(filename, JSON.stringify(jsonData, null, 2));
}

function saveCSV(data, filename) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((row, index) => `${index + 1},${Object.values(row).join(',')}`).join('\n');
    const coloredHeaders = `\x1b[34m${headers}\x1b[0m`; // Blue color for headers
    fs.writeFileSync(filename, `id,${coloredHeaders}\n${rows}`);
}

function saveTXT(data, filename) {
    const headers = Object.keys(data[0]).join(' | ');
    const rows = data.map((row, index) => `${index + 1} | ${Object.values(row).join(' | ')}`).join('\n');
    const coloredHeaders = `\x1b[34m${headers}\x1b[0m`; // Blue color for headers
    fs.writeFileSync(filename, `id | ${coloredHeaders}\n${rows}`);
}

function saveHTML(data, filename) {
    const headers = Object.keys(data[0]).map(header => `<th style="background-color: #ADD8E6;">${header}</th>`).join(''); // Light blue background for headers
    const rows = data.map((row, index) => `<tr><td>${index + 1}</td>${Object.values(row).map(value => `<td>${value}</td>`).join('')}</tr>`).join('');
    const html = `
        <table border="1" cellspacing="0" cellpadding="5">
            <thead>
                <tr><th style="background-color: #ADD8E6;">id</th>${headers}</tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>`;
    fs.writeFileSync(filename, html);
}

module.exports = { saveJSON, saveCSV, saveTXT, saveHTML };
