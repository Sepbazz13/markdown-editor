function highlightCode(code, language = '') {
    // Escape HTML characters
    const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Simplified code highlighting
    return `<pre class="bg-gray-100 p-4 rounded-md overflow-x-auto"><code class="language-${language}">${escapedCode}</code></pre>`;
}

function processCodeBlocks(html) {
    // Corregir expresión regular para bloques de código
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, function(match, language, codeContent) {
        return highlightCode(codeContent.trim(), language);
    });
    
    return html;
}

function convertToHtml(text) {
    // Asegurarse de convertir saltos de línea en <p> para párrafos normales
    let html = text;
    
    // Evitar que las funciones de transformación colisionen entre sí
    html = html.replace(/\n\n([^#\-\d`].*)/g, "<p>$1</p>");
    
    html = convertHeadings(html);
    html = convertLists(html);
    html = convertTextStyles(html);
    html = processCodeBlocks(html);
    
    // Reemplazar saltos de línea restantes con <br>
    html = html.replace(/\n/g, "<br>");
    
    return html;
}