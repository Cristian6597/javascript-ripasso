const baseUrl = 'https://jsonplaceholder.typicode.com';
const loading = document.querySelector('#todos .loading');
const todoDiv = document.querySelector('#todos');

// Crea il div per il TODO e lo restituisce
const createTodoDiv = (todo) => {
    const div = document.createElement('div'); // Crea un div 
    div.className = "contenitore"; // Assegna la classname al div 
    const todoContent = document.createElement('div'); // Div all'interno del div
    todoContent.className = "todo-content"; // Nome del div
    const input = document.createElement('input'); // Inserire input
    const btn = document.createElement('button');
    btn.className = "close-btn";
    btn.innerHTML = "X";
    input.type = "checkbox";
    input.id = todo.id; // ID del TODO, non ho capito ancora bene come prende l'id ma funziona
    input.checked = todo.completed;
    input.onchange = handleCheckbox;
    const label = document.createElement('label');
    label.textContent = todo.title;

    todoContent.appendChild(input); // Mostra tutto in pagina
    todoContent.appendChild(label);
    div.appendChild(todoContent);
    div.appendChild(btn);
    
    // Aggiungo l'event listener per il bottone "X"
    btn.addEventListener('click', () => {
        todoManager.delete(todo.id); // Chiama il metodo delete passando l'ID del TODO
        //Uso il metodo delete
        fetch(baseUrl + '/todos/' + todo.id, {
            method: 'DELETE'
        });
    });
    
    return div;
}

// Manager delle funzionalità
const todoManager = (() => { // Closure
    let state = []; // Lista degli elementi che di base è vuota

    return {
        set: function(newState) {
            state = newState;
            this.render(); // Ogni volta che c'è un nuovo stato, renderizza in pagina
        },
        render: function() { // Prendere i TODO e visualizzarli nel HTML
            todoDiv.innerHTML = ""; // Cancella tutta la lista
            state.forEach(element => {
                todoDiv.appendChild(createTodoDiv(element));
            });
        },
        add: function(newElement) {
            state.unshift(newElement);
            this.render();
        },
        delete: function(deleteElementId) { // Usa l'ID per identificare il TODO da rimuovere
            // Trova l'indice dell'elemento da rimuovere
            const index = state.findIndex(todo => todo.id === deleteElementId); //todo è un placeholder in questo caso, ci si può mettere tutto
            if (index !== -1) {
                state.splice(index, 1); // è un controllo che serve a verificare se findIndex trova quello che cerchiamo, se lo trova resistuisce numero positivo
                //altrimenti è negativo
            }
            this.render(); // Rendi di nuovo la lista
        }
    };
})();


fetch(baseUrl + '/todos')
.then(response => response.json())
.then(todos => {
    loading.remove(); // Rimuovi l'elemento di caricamento
    todoManager.set(todos); // Imposta i nuovi TODO
})
.catch((err) => {
    console.log('err: ', err);
    loading.textContent = 'Errore!!!';
});

// Gestore del checkbox
const handleCheckbox = (event) => {
    console.log(event.target.checked);
    fetch(
        baseUrl + '/todos/' + event.target.id,
        { 
            method: 'PATCH', 
            body: JSON.stringify({ completed: event.target.checked }),
            headers: { "Content-Type": "application/json" }
        }
    )
    .then(response => response.json())
    .then(todo => {
        console.log(todo);
    })
    .catch(() => {
        event.target.checked = !event.target.checked; // Ripristina la checkbox in caso di errore
    });
};

// Aggiunge un nuovo elemento in fondo al form
const todoForm = document.querySelector('#todoForm');
todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita le azioni di default
    const title = event.target.children.title; // title viene dal HTML

    fetch(baseUrl + '/todos', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            completed: false,
            userId: 1
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(newTodo => {
        todoManager.add(newTodo); // Aggiungi il nuovo TODO
    });
});

 //aggiungere un event listener al click del bottone che fa in modo di cancellare il div (fatto)

// aggiungere un evento per modificare la lista
       
       
// crud = create read uptade e delete
// metodi : Get, Post, Put, Patch, Delete
       
//per prendere le API, usare postman e insomnia (siti)