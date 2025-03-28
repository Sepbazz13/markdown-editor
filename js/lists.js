function convertLists(html) {
    // Corregir la expresión regular para listas no ordenadas
    html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.+<\/li>\n?)+/g, function(match) {
        return `<ul class="list-disc list-inside mb-2">${match}</ul>`;
    });

    // Corregir la expresión regular para listas ordenadas
    html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.+<\/li>\n?)+/g, function(match) {
        return `<ol class="list-decimal list-inside mb-2">${match}</ol>`;
    });

    return html;
}