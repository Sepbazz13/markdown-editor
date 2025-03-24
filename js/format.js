/**
 * Funciones para aplicar formato de texto en el editor
 */
window.formatFunctions = {
    // Convierte negrita y cursiva en HTML
    applyBoldItalic: function(text) {
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); // Negrita
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>'); // Cursiva
        return text;
    },

    // Alterna entre negrita y cursiva en el texto seleccionado
    toggleTextFormat: function(editor, format) {
        const selectionStart = editor.selectionStart;
        const selectionEnd = editor.selectionEnd;
        const selectedText = editor.value.substring(selectionStart, selectionEnd);

        let formattedText;
        if (format === 'bold') {
            formattedText = selectedText.startsWith('**') && selectedText.endsWith('**')
                ? selectedText.slice(2, -2) // Quitar negrita
                : `**${selectedText}**`; // Aplicar negrita
        } else if (format === 'italic') {
            formattedText = selectedText.startsWith('*') && selectedText.endsWith('*')
                ? selectedText.slice(1, -1) // Quitar cursiva
                : `*${selectedText}*`; // Aplicar cursiva
        }

        editor.value = editor.value.substring(0, selectionStart) + formattedText + editor.value.substring(selectionEnd);
        editor.setSelectionRange(selectionStart, selectionStart + formattedText.length);
        
        return editor.value;
    }
};
