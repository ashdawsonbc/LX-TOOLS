document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    if (content) {
        content.addEventListener('DOMNodeInserted', (event) => {
            if (event.target.tagName === 'SCRIPT') {
                eval(event.target.textContent);
            }
        });
    }
});
