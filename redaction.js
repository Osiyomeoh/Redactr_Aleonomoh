document.addEventListener('DOMContentLoaded', function () {
    const redactForm = document.getElementById('redaction-form');
    const redactedText = document.getElementById('redacted-text');
    const stats = document.getElementById('stats');

    redactForm.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    document.getElementById('redact-button').addEventListener('click', function () {
        const text = document.getElementById('text').value;
        const redactWords = document.getElementById('redact-words').value.trim().split(' ');
        const redactChar = document.getElementById('redact-char').value;
        let redactedTextContent = text;

        redactWords.forEach(word => {
            const regex = new RegExp('\\b' + word + '\\b', 'gi');
            redactedTextContent = redactedTextContent.replace(regex, redactChar.repeat(word.length));
        });

        redactedText.textContent = redactedTextContent;

        // Calculate and display statistics
        const wordsScanned = text.split(/\s+/).length;
        const wordsRedacted = redactWords.length;
        const charactersScrambled = redactWords.reduce((total, word) => total + word.length, 0);

        stats.innerHTML = `Statistics:
            <br>Words Scanned: ${wordsScanned}
            <br>Words Redacted: ${wordsRedacted}
            <br>Characters Scrambled: ${charactersScrambled}
            <br>Time Taken: ${new Date().toLocaleTimeString()}
        `;
    });
});
