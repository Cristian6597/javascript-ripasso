const baseUrl = 'https://jsonplaceholder.typicode.com'
const loading = document.querySelector('#todos .loading');
const todoDiv = document.querySelector('#todos'); 

const createTodoDiv = (todo) => {
    const div = document.createElement('div');
    const input = document.createElement('input');
    input.type = "checkbox";
    input.id = todo.id;
    input.checked = todo.completed;
    input.onchange = handleCheckbox;
    const label = document.createElement('label');
    label.textContent = todo.title;
    div.appendChild(input);
    div.appendChild(label);
    return div;
}
//manager delle funzionalità

const todoManager = () => { //closeure
    let state = []; //lista degli elementi che di base è vuota
    return {
        set: function(newState) {
            state = newState;
            this.render(); //ogni volta che c'è un nuovo stato, renderizza in pagina
        },
        render: function() { //prendere i todo e le visualizza nel html
            todoDiv.innerHTML = ""; //cancella tutta la lista così ogni volta che reinderizza la fetch abbiamo il nuovo stato in cima
            state.forEach(element => {
                todoDiv.appendChild(createTodoDiv(element));
            })
        },
        add: function (newElement) {
            state.unshift(newElement);
            this.render();
        },
        delete: function(deleteElement) {
            state.delete(deleteElement)
            this.render();
        }
    }
}

const firstTodos = todoManager();

fetch(baseUrl + '/todos')
.then(response => response.json())
.then(todos => {
    const loading = document.querySelector('#todos .loading'); //document.querySelector sostituisce getElementbyID/class
        loading.remove();
        firstTodos.set(todos);
    })
    .catch((err) => {
        console.log('err: ', err);
        loading.textContent= 'Errore!!!'
    })
    
const handleCheckbox = (event) => {
    console.log(event.target.checked);
    fetch(
        baseUrl + '/todos/' + event.target.id,
        { 
            method: 'PATCH', 
            body: JSON.stringify ({completed: event.target.checked}) ,
            headers: { "Content-Type": "application/json"}
        }
    )
    .then(response => response.json())
    .then(todo => {
        console.log(todo);
    })

    .catch(() => {
        event.target.checked = !event.target.checked; //quando si ha un errore o si è offline, la checkbox ritorna al punto di partenza
    })

}
//aggiunge un nuovo elemento in fondo al form

const todoForm = document.querySelector('#todoForm');
// todoForm.onsubmit = () => {}
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault(); //se ci sono delle azioni di default queste vengono evitate
        const title = event.target.children.title //title viene dal html
        fetch(baseUrl + '/todos', {
            method: 'POST',
            body: JSON.stringify({
                title: title.value,
                completed: false,
                userId: 1
            }),
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(newTodo => {
            firstTodos.add(newTodo);

        })
    })

// crud = create read uptade e delete
// metodi : Get, Post, Put, Patch, Delete

//per prendere le API, usare postman e insomnia (siti)