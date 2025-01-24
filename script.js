// URL dell'API per le fermate (modifica se necessario)
const URL = "https://gpa.madbob.org/query.php?stop=";

// Funzione per aggiungere un passaggio alla lista
function aggiungiPassaggio(linea, orario) {
    const stopItems = document.getElementById("stopItems");

    // Crea un nuovo elemento della lista
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `Linea: ${linea} - Orario: ${orario}`;

    // Aggiungi l'elemento alla lista
    stopItems.appendChild(li);
}

// Funzione per mostrare i passaggi
function mostra(lista) {
    const stopItems = document.getElementById("stopItems");

    // Svuota la lista per evitare duplicati
    stopItems.innerHTML = "";

    // Aggiungi ogni passaggio dalla lista
    lista.forEach(passaggio => {
        aggiungiPassaggio(passaggio.line, passaggio.hour);
    });

    // Mostra la sezione della lista
    document.getElementById("stopList").style.display = "block";
}

// Funzione per cercare una fermata
function cercafermata() {
    const stopNumber = document.getElementById("stopNumber").value;

    // Controlla se il numero è valido
    if (!stopNumber) {
        alert("Per favore, inserisci un numero di fermata valido.");
        return;
    }

    // Effettua la richiesta fetch all'API
    fetch(URL + stopNumber)
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore nella richiesta al server");
            }
            return response.json();
        })
        .then(data => mostra(data))
        .catch(error => {
            alert("Errore: " + error.message);
        });
}

// Aggiungi l'evento click al bottone
document.getElementById("showStops").addEventListener("click", cercafermata);
