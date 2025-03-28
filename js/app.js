// Versión actualizada de app.js sin alerta de límite

document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.querySelector("#markdown-input");
    const previewSection = document.querySelector("#preview-section");
    const wordCountDisplay = document.querySelector("#word-count");
    const clearEditorButton = document.querySelector("#clear-editor");
    const loadFileButton = document.querySelector("#load-file");
    const fileInput = document.querySelector("#file-input");
    const exportPdfButton = document.querySelector("#export-pdf");
    const applyFormatButton = document.querySelector("#apply-format");
    
    // Límite de caracteres
    const CHARACTER_LIMIT = 900;

    function renderPreview(html) {
        previewSection.innerHTML = `<div class="space-y-3">${html}</div>`;
    }

    function updateWordCount() {
        const text = markdownInput.value;
        const palabras = text.match(/\b\w+\b/g) || [];
        const caracteres = text.length;
        
        // Comprobar si se sobrepasa el límite de caracteres
        if (caracteres > CHARACTER_LIMIT) {
            wordCountDisplay.innerHTML = `palabras: ${palabras.length} | <span class="text-red-500 font-bold">caracteres: ${caracteres}</span>`;
        } else {
            wordCountDisplay.innerHTML = `palabras: ${palabras.length} | caracteres: ${caracteres}`;
        }
    }

    // Modificar el evento input para limitar caracteres
    markdownInput.addEventListener("input", function(event) {
        if (this.value.length > CHARACTER_LIMIT) {
            // Truncar el texto al límite de caracteres
            this.value = this.value.substring(0, CHARACTER_LIMIT);
        }
        
        const text = this.value;
        const html = convertToHtml(text);
        renderPreview(html);
        updateWordCount();
    });

    // También necesitamos controlar el pegado de texto
    markdownInput.addEventListener("paste", function(event) {
        const pastedText = (event.clipboardData || window.clipboardData).getData('text');
        
        // Comprobar si al pegar se excederá el límite
        if (this.value.length + pastedText.length > CHARACTER_LIMIT) {
            // Calcular cuántos caracteres podemos pegar
            const remainingSpace = CHARACTER_LIMIT - this.value.length;
            
            if (remainingSpace > 0) {
                // Insertar solo hasta el límite
                const selStart = this.selectionStart;
                const selEnd = this.selectionEnd;
                
                const textBefore = this.value.substring(0, selStart);
                const textAfter = this.value.substring(selEnd);
                
                this.value = textBefore + pastedText.substring(0, remainingSpace) + textAfter;
                
                // Posicionar el cursor después del texto pegado
                this.selectionStart = this.selectionEnd = selStart + remainingSpace;
            }
            
            // Prevenir el comportamiento predeterminado de pegado
            event.preventDefault();
            
            // Actualizar vista previa y conteo
            const html = convertToHtml(this.value);
            renderPreview(html);
            updateWordCount();
        }
    });

    // Control de teclas para evitar métodos alternativos de entrada
    markdownInput.addEventListener("keydown", function(event) {
        // Si estamos en el límite y no es una tecla de control (como Delete, Backspace, flechas, etc.)
        if (this.value.length >= CHARACTER_LIMIT && 
            !event.ctrlKey && !event.metaKey && 
            event.key.length === 1) {
            event.preventDefault();
        }
    });

    function clearEditor() {
        markdownInput.value = '';
        previewSection.innerHTML = '<div class="text-gray-400">Markdown preview will appear here...</div>';
        updateWordCount();
    }

    function exportToPdf() {
        const exportOverlay = document.createElement('div');
        exportOverlay.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div class="animate-pulse text-white text-2xl">
                    Exporting to PDF... 📄
                </div>
            </div>
        `;
        document.body.appendChild(exportOverlay);

        setTimeout(() => {
            try {
                const content = previewSection.innerHTML;
                if (content && content.trim() !== '') {
                    const blob = new Blob([content], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                   
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'markdown_document.pdf';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                   
                    document.body.removeChild(exportOverlay);
                } else {
                    throw new Error('Empty content');
                }
            } catch (error) {
                document.body.removeChild(exportOverlay);
                alert('Could not generate PDF');
            }
        }, 1500);
    }

    function applyFormat() {
        const text = markdownInput.value;
        const html = convertToHtml(text);
        renderPreview(html);
    }

    loadFileButton.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
       
        if (!file.name.endsWith('.md')) {
            alert('Please select only Markdown files (.md)');
            return;
        }

        const reader = new FileReader();
       
        reader.onload = (e) => {
            const fileContent = e.target.result;
            // Truncar el contenido del archivo si excede el límite
            markdownInput.value = fileContent.substring(0, CHARACTER_LIMIT);
           
            const html = convertToHtml(markdownInput.value);
            renderPreview(html);
            updateWordCount();
        };
       
        reader.onerror = () => {
            alert('Could not load the file. Please check if it is a valid text file.');
        };
       
        reader.readAsText(file);
    });

    clearEditorButton.addEventListener("click", clearEditor);
    exportPdfButton.addEventListener('click', exportToPdf);
    applyFormatButton.addEventListener('click', applyFormat);

    // Inicializar conteo de palabras y vista previa al cargar la página
    updateWordCount();
    
    // Asegurar que la vista previa funcione al inicio si hay contenido
    if (markdownInput.value.trim() !== '') {
        const html = convertToHtml(markdownInput.value);
        renderPreview(html);
    }
});