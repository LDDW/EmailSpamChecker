// import checker
import {Checker} from './checker.js';
//init new checker
const checker = new Checker();
// create table with data
const table = document.getElementById('table');
table.innerHTML = await checker.setHtmlTable(table);
// check content of textarea
const textarea = document.getElementById('textarea');
const loader = document.getElementById('loader');
let timeoutId;

textarea.addEventListener('keyup', function(event) {
    loader.classList.remove('hidden');

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        loader.classList.add('hidden');
        checker.check(textarea.textContent);
    }, 2000);
});

//counter