document.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const previewBtn = document.getElementById('previewBtn');
    const previewBtnMobile = document.getElementById('previewBtnMobile');
    const contrastBtn = document.getElementById('contrastBtn');
    const contrastBtnMobile = document.getElementById('contrastBtnMobile');
    
    let contrastActive = false;

    // Función para convertir Markdown a HTML usando regex
    function markdownToHtml(markdown) {
        // Convertir encabezados (# Título)
        let html = markdown.replace(/^# (.+)$/gm, '<h1>$1</h1>');
        html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        
        // Convertir listas sin orden (* Item)
        html = html.replace(/^\* (.+)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.+<\/li>\n)+/g, function(match) {
            return '<ul>' + match + '</ul>';
        });
        
        // Convertir listas ordenadas (1. Item)
        html = html.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>');
        html = html.replace(/(<li>.+<\/li>\n)+/g, function(match) {
            // Verificamos si ya es parte de una lista sin orden
            if (match.includes('<ul>')) {
                return match;
            }
            return '<ol>' + match + '</ol>';
        });
        
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
        
        // Si el contraste está activo, aplicarlo
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

    // Event listeners para los botones
    previewBtn.addEventListener('click', generatePreview);
    previewBtnMobile.addEventListener('click', generatePreview);
    contrastBtn.addEventListener('click', toggleContrast);
    contrastBtnMobile.addEventListener('click', toggleContrast);

    // Generar preview al cargar
    generatePreview();
});