const inputBox = document.getElementById("input-box");

const listContainer = document.getElementById("list-container");
const taskDate = document.getElementById("task-date");

// Wenn Input leer → Popup, sonst → neues <li> erstellen, Text rein, zur Liste hinzufügen, Input leeren.

function addTask() {
  // Wenn der Benutzer im Eingabefeld keinen Text eingibt, wird eine Warnung angezeigt. value entspricht dem Text im Eingabefeld.Trim entfernt Leerzeichen am Anfang und Ende des Textes."" => leerer String. “Wenn der Benutzer nichts eingegeben hat (oder nur Leerzeichen) …”
  if (inputBox.value.trim() === "") {
    alert("Bitte geben Sie eine Aufgabe ein!");
  } else {
    // Erstellen eines neuen Listenelements (li) und Hinzufügen des Textes aus dem Eingabefeld
    let li = document.createElement("li");
    // Setzen des Textinhalts des Listenelements auf den Wert des Eingabefelds
    li.innerHTML = taskDate.value
      ? " <small>📅 " + taskDate.value + "</small>"
      : "";
    // Hinzufügen des neuen Listenelements zum Listcontainer(Liste). Fügt die neue Aufgabe zur To-Do-Liste hinzu.
    listContainer.appendChild(li);
    // Leeren des Eingabefelds nach dem Hinzufügen der Aufgabe

    let span = document.createElement("span");
    // Erstellt ein neues kleines HTML-Element (<span>), das noch nicht auf der Seite ist.
    span.innerHTML = "\u00d7";
    // Setzt den Inhalt des <span>-Elements auf das Multiplikationszeichen (×), das oft als Symbol für "Löschen" oder "Schließen" verwendet wird.
    li.appendChild(span);
    // Hängt das <span> (×) an das Listen-Element (<li>) an.
    inputBox.value = "";
    taskDate.value = "";
    // Ruft die Funktion saveData auf, um die aktuelle Liste im lokalen Speicher zu speichern.
    saveData();
  }
}

listContainer.addEventListener(
  "click",
  function (e) {
    // Überprüft, ob das angeklickte Element ein Listenelement (<li>) ist, „WENN auf ein <li> geklickt wurde …“
    if (e.target.tagName === "LI") {
      // Wechselt die CSS-Klasse "checked" für das angeklickte Listenelement. Dadurch wird der visuelle Zustand der Aufgabe geändert (z. B. durchstreichen, wenn sie erledigt ist).
      e.target.classList.toggle("checked");
      // „… DANN füge die Klasse 'checked' hinzu oder entferne sie.“
      saveData();
    }
    if (e.target.tagName === "SPAN") {
      // Entfernt das übergeordnete Element des angeklickten <span>-Elements (das Listenelement <li>). Dadurch wird die Aufgabe aus der Liste gelöscht.
      e.target.parentElement.remove();
      // „… DANN entferne das übergeordnete <li>-Element.“
      saveData();
    }
  },
  false
  //  Bedeutet: Der Event wird in der normalen Reihenfolge behandelt
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
