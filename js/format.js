function convertHeadings(html) {
    // Corregir expresiones regulares para que funcionen correctamente
    html = html.replace(/^# (.+)$/gm, "<h1 class='text-6xl font-bold border-b pb-2 mb-4'>$1</h1>");
    html = html.replace(/^## (.+)$/gm, "<h2 class='text-5xl font-bold border-b pb-2 mb-4'>$1</h2>");
    html = html.replace(/^### (.+)$/gm, "<h3 class='text-4xl font-bold mb-3'>$1</h3>");
    html = html.replace(/^#### (.+)$/gm, "<h4 class='text-3xl font-bold mb-3'>$1</h4>");
    html = html.replace(/^##### (.+)$/gm, "<h5 class='text-2xl font-bold mb-2'>$1</h5>");
    html = html.replace(/^###### (.+)$/gm, "<h6 class='text-xl font-bold mb-2'>$1</h6>");
    return html;
}

function convertTextStyles(html) {
    // Corregir expresiones regulares para que funcionen correctamente
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    return html;
}