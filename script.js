document.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 4; i++) {
        setupSection(i);
    }

    function setupSection(sectionNumber) {
        const inputArea = document.getElementById(`inputArea${sectionNumber}`);
        const generateButton = document.getElementById(`generateTable${sectionNumber}`);
        const table = document.getElementById(`myTable${sectionNumber}`);
        const userInput = document.getElementById(`userInput${sectionNumber}`);

        userInput.addEventListener('input', function() {
            userInput.value = userInput.value.toUpperCase();
        });

        generateButton.addEventListener('click', function() {
            // Limpiar la tabla excepto el encabezado
            table.innerHTML = `
                <tr>
                    <th>Cliente</th>
                    <th>Copiar</th>
                </tr>
            `;

            // Obtener las líneas del área de texto
            const lines = inputArea.value.split('\n');
            const extraText = userInput.value.trim();

            lines.forEach((line, index) => {
                if (line.trim()) {
                    const row = table.insertRow();
                    const cell1 = row.insertCell(0);
                    const cell2 = row.insertCell(1);

                    cell1.textContent = line;

                    const button = document.createElement('button');
                    button.textContent = 'COPIAR';
                    button.classList.add('copy-button');
                    button.addEventListener('click', function() {
                        const combinedText = `${line} ${extraText}`;
                        copyToClipboard(combinedText);
                        row.remove();
                    });

                    cell2.appendChild(button);
                }
            });

            // Limpiar el área de texto después de generar la tabla
            inputArea.value = '';
        });

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(function() {
                console.log('Texto copiado al portapapeles');
            }).catch(function(err) {
                console.error('Error al copiar el texto: ', err);
            });
        }
    }
});
