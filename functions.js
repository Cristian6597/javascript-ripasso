console.log('Hello World')

//recorsive functions

/* const countdown = (num) => {
    // for (let i = num; i >= 0; i--) {
    //     console.log(i)
    // }
    if (num > 0) {
        console.log(num);
        countdown(num-1);
    }
} */

//countdown(10);


//Closure

/* const counter = () => {
    let count = 0;
    return () => {
        return ++count;
    }
}

const firstCounter = counter();

firstCounter();

console.log(firstCounter()); */


//simulazione useState con closure

/* const useState = (initialState) => {
    let state = initialState;
    return (newState) => {
        state = newState;
        return state;
    }
}

const person = useState('Mario');
console.log(person('Luigi'));

//objects

const user = {
    firstName: 'Mario', //proprietà, (la chiave è firstName)
    lastName: 'Rossi',
    age: 27,
    fullName: function() { //una funzione all'interno di un oggetto si chiama metodo, mentre gli altri dati si chiamano proprietà
        return this.firstName + ' ' + this.lastName //this funziona solo con la funzione normale e non con la arrow function
    }
};

user.firstName = "Luca" //modificato la proprietà all'interno dell oggetto dall'esterno
console.log(user.fullName()) */

//esercizio, fare una calcolatrice con la closure, almeno addizione sottrazione e uguale


//let n = 5 // farlo prendere da un input

/* const calcolatrice = () => {
    let risultato = n
    console.log("il numero iniziale è " + risultato)
return {
    somma: (n) => {
        risultato = risultato + n
        return risultato
    },
    sottrazione: (n) => {
        risultato = risultato - n
        return risultato
    },
    reset: () => {
        risultato = 0
        return risultato
    }
} */
// }

/* const calcolo = calcolatrice();
console.log(calcolo.somma(2))
console.log(calcolo.sottrazione(2))
console.log(calcolo.reset())
 */

const calc = (n = 0) => {
    let result = n;
    const operations = {
        add: (num) => {
            result += num;
            return operations;
        },
        sub : (num) => {
            result -= num;
            return operations;
        },
        equal: () => result //nelle arrow function se non si mettono le graffe equivale a "return", in questo caso "return result"
    } 
    return operations;
}

console.log(calc(22).add(5).sub(2).equal())


