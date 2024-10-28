
// Promise & concurrency

//promise

/* console.log(1);

setTimeout(() => {
    console.log(2)
}, 4000);

console.log(3)
 */

const error = false;
console.log(1);
const sleep = new Promise((res, rej) => {
    if (error) {
        rej ("non ho mantenuto la promessa")
    } else {
    setTimeout(() => {
        console.log(2)
        res("daje roma")
    }, 2000)}
});
console.log(3);

// sleep;

// sleep
//     .then((res) => {
//     console.log(res)
// })
//     .catch((err)=>{
//     console.log(err);
// })

fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch((err) => {
        console.log((err))
      })