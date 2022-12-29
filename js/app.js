// import checker
import {Checker} from './checker.js';

//init new checker
const checker = new Checker();
const table = document.getElementById('table');
const textarea = document.getElementById('textarea');
const loader = document.getElementById('loader');
const counter = document.getElementById('counter');
let timeoutId;

// create table with data
table.innerHTML = await checker.setHtmlTable(table);
// check content of textarea
textarea.addEventListener('keyup', function() {
    //counter
    loader.classList.remove('hidden');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
        loader.classList.add('hidden');
        counter.innerHTML = checker.counter(textarea.textContent);
        textarea.innerHTML = await checker.check(textarea.textContent);
    }, 2000);
});