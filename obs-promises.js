const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

const doSomething = () => {
    return new Promise((resolve) => {
        resolve('valor 1');
        //La promesa solo devuelve un valor y ya esta
    });
}

const doSomething$ = () => {
    return new Observable(oberver => {
        oberver.next('valor 1 $');
        oberver.next('valor 2 $');
        oberver.next('valor 3 $');
        oberver.next(null);
        setTimeout(()=> {
            oberver.next('valor 4 $');
        },5000);
        setTimeout(()=> {
            oberver.next(null);
        },8000);
        setTimeout(()=> {
            oberver.next('valor 5 $');
        },10000);
    });
}

(async () => {
    const rta = await doSomething();
    console.log(rta);
})();

(() => {
    const obs$ = doSomething$();
    obs$
    .pipe(
        filter(value => value !== null)
    )
    .subscribe(rta => {
        console.log(rta);
    });
})();