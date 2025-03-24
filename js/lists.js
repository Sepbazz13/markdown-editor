/**
 * Funciones para transformar listas en HTML
 */
window.listFunctions = {
    // Convierte listas numeradas en <ol><li>...</li></ol>
    convertOrderedLists: function(text) {
        return text.replace(/(?:^|\n)(\d+\.\s.+)(?:\n|$)/g, function(match, group) {
            let items = group.split('\n').map(item => item.replace(/^\d+\.\s/, '<li>') + '</li>');
            return '<ol>' + items.join('') + '</ol>';
        });
    }
};
