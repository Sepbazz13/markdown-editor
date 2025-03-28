document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("editor");
    const preview = document.getElementById("preview");
    const clearButton = document.getElementById("clearButton");
    const wordCount = document.getElementById("wordCount");
    const charCount = document.getElementById("charCount");
    const maxChars = 100;

    function updatePreview() {
        preview.innerHTML = marked.parse(editor.value);
        updateWordCharCount();
    }

    function updateWordCharCount() {
        const text = editor.value;
        const currentLength = text.length;
        charCount.textContent = currentLength;
        wordCount.textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
        
        if (currentLength >= maxChars) {
            charCount.style.color = "red";
            alert("Has alcanzado el límite de 100 caracteres");
        } else {
            charCount.style.color = "black";
        }
    }

    editor.addEventListener("input", () => {
        if (editor.value.length > maxChars) {
            editor.value = editor.value.substring(0, maxChars);
        }
        updateWordCharCount();
        updatePreview();
    });

    clearButton.addEventListener("click", () => {
        editor.value = "";
        preview.innerHTML = "";
        wordCount.textContent = "0";
        charCount.textContent = "0";
        charCount.style.color = "black";
    });

    updatePreview();
});
