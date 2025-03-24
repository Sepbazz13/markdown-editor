/**
 * Archivo principal que coordina la funcionalidad del editor
 */

document.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const previewBtn = document.getElementById('previewBtn');
    const previewBtnMobile = document.getElementById('previewBtnMobile');
    const contrastBtn = document.getElementById('contrastBtn');
    const contrastBtnMobile = document.getElementById('contrastBtnMobile');
    const formatBtn = document.getElementById('formatBtn');
    const formatBtnMobile = document.getElementById('formatBtnMobile');

    let contrastActive = false;

    // Función para convertir Markdown a HTML usando regex
    function markdownToHtml(markdown) {
        // Procesar bloques de código primero (blocks.js)
        let html = window.blockFunctions.processCodeBlocks(markdown);
        
        // Procesar listas numeradas (lists.js)
        html = window.listFunctions.convertOrderedLists(html);
        
        // Convertir encabezados (# Título)
        html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
        html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        
        // Convertir listas sin orden (* Item)
        html = html.replace(/^\* (.+)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.+<\/li>\n)+/g, function(match) {
            if (match.includes('<ol>')) {
                return match;
            }
            return '<ul>' + match + '</ul>';
        });

        // Convertir negrita y cursiva (format.js)
        html = window.formatFunctions.applyBoldItalic(html);
        
        // Convertir saltos de línea
        html = html.replace(/\n/g, '<br>');
        
        // Limpiar etiquetas adicionales generadas por la conversión
        html = html.replace(/<\/ul><br><ul>/g, '');
        html = html.replace(/<\/ol><br><ol>/g, '');
        
        return html;
    }

    // Función para generar la vista previa
    function generatePreview() {
        const markdownText = editor.value;
        const htmlContent = markdownToHtml(markdownText);
        preview.innerHTML = htmlContent;
        
        if (contrastActive) {
            applyContrast();
        }
    }

    // Función para aplicar o quitar contraste a los encabezados
    function toggleContrast() {
        contrastActive = !contrastActive;
        
        if (contrastActive) {
            applyContrast();
            contrastBtn.classList.add('bg-yellow-400');
            contrastBtn.classList.remove('bg-white');
            contrastBtnMobile.classList.add('bg-yellow-400');
            contrastBtnMobile.classList.remove('bg-white');
        } else {
            removeContrast();
            contrastBtn.classList.remove('bg-yellow-400');
            contrastBtn.classList.add('bg-white');
            contrastBtnMobile.classList.remove('bg-yellow-400');
            contrastBtnMobile.classList.add('bg-white');
        }
    }

    // Aplicar contraste
    function applyContrast() {
        preview.classList.add('header-contrast');
    }

    // Quitar contraste
    function removeContrast() {
        preview.classList.remove('header-contrast');
    }

    // Función para aplicar formato de negrita/cursiva (format.js)
    function toggleFormat() {
        const formattedText = window.formatFunctions.toggleTextFormat(editor);
        editor.value = formattedText;
        generatePreview();
    }

    // Event listeners
    editor.addEventListener('input', function() {
        setTimeout(generatePreview, 300);
    });

    previewBtn.addEventListener('click', generatePreview);
    previewBtnMobile.addEventListener('click', generatePreview);
    contrastBtn.addEventListener('click', toggleContrast);
    contrastBtnMobile.addEventListener('click', toggleContrast);
    formatBtn.addEventListener('click', toggleFormat);
    formatBtnMobile.addEventListener('click', toggleFormat);

    // Detectar atajos de teclado
editor.addEventListener('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        if (event.key === 'b' || event.key === 'B') {
            event.preventDefault();
            window.formatFunctions.toggleTextFormat(editor, 'bold');
        } else if (event.key === 'i' || event.key === 'I') {
            event.preventDefault();
            window.formatFunctions.toggleTextFormat(editor, 'italic');
        }
    }
});


    // Generar preview al cargar
    generatePreview();
});
