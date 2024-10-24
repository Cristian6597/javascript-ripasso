const loading = document.querySelector('#todos .loading');


fetch('https://jsonplaceholder.typicode.com/todos')
.then(response => response.json())
.then(todos => {
    const todoDiv = document.querySelector('#todos'); 
    const loading = document.querySelector('#todos .loading'); //document.querySelector sostituisce getElementbyID/class
        loading.remove();
        todos.forEach(todo => {
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
            todoDiv.appendChild(div);
        });
    })
    .catch((err) => {
        console.log('err: ', err);
        loading.textContent= 'Errore!!!'
    })
    
const handleCheckbox = (event) => {
    console.log(event.target.checked);
    fetch(
        'https://jsonplaceholder.typicode.com/todos/' + event.target.id,
        { method: 'PUT' }
    )
    .then(response => response.json())
    .then(todo => {
        console.log(todo);
    })

    .catch(() => {
        event.target.checked = !event.target.checked; //quando si ha un errore o si è offline, la checkbox ritorna al punto di partenza
    })

}