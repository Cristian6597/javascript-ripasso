fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json())
    .then(images => {
        const imgDiv = document.querySelector('#img');
        images.forEach(api => {
            const div = document.createElement('div');
            const link = document.createElement('a');
            link.href = api.url;
            const img = document.createElement('img'); 
            img.src = api.thumbnailUrl;
            /* img.alt = api.title; */ //Inserisce il titolo dell'immagine ( troppo spazio e non lo voglio )
            link.appendChild(img);  
            div.appendChild(link);   
            imgDiv.appendChild(div);
        });
    })
    .catch((err) => {
        console.log('Errore: ', err);
    });
