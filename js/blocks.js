/**
 * Funciones para resaltar bloques de código en la vista previa
 */
window.blockFunctions = {
    // Detecta bloques de código entre triple backticks (```) y los convierte en <pre><code>...</code></pre>
    processCodeBlocks: function(text) {
        return text.replace(/```([\s\S]*?)```/g, function(match, code) {
            return `<pre><code class="language-js">${code.trim()}</code></pre>`;
        });
    }
};
