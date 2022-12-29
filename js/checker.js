export class Checker {

    /**
     * @function getJson
     * @returns object
     */
    #getJson(){
        try {
            return fetch('./js/checker.json')
            .then((response) => response.json())
            .then((data) => data)
        } catch (error) {
            console.log(error);  
        } 
    }   

    /**
     * @function getArrayWithAllWords
     * @returns array with all words store in json file 'checker.json'
     */
    async #getArrayWithAllWords(){
        const getJson = await this.#getJson();
        let array = [];
        getJson.categories.forEach(category => {
            category.words.forEach(word => {
                array.push(word.toLowerCase());
            });
        });
        return array;
    }
    
    /**
     * @async 
     * @function check the user email
     * @param {*} object 
     */
    async check(data){
        if(data !== ''){
            const arrayWithAllWords = await this.#getArrayWithAllWords();
            // const arrayUserMail = data.split(/\s/g);
            // let str = '';
            // arrayUserMail.forEach(userWord => {
            //     let word = userWord.replace(/[.,!?]/g, '');
            //     if (arrayWithAllWords.indexOf(word) > -1) {
            //         str += `<span style="color:red;">${userWord}</span> `;
            //     } else {
            //         str += `${userWord} `;
            //     }
            // });

            let str = data;
            arrayWithAllWords.forEach(jsonWord => {
                if(data.toLowerCase().search(jsonWord) > -1){
                    str =  str.replace(jsonWord, `<span style="color:red;">${jsonWord}</span>`);
                }
            });
            return str;
        } else {
            return '';
        }
    }   

    /**
     * @async 
     * @function setHtmlTable
     * @param {*} object is table element
     * @returns html of table
     */
    async setHtmlTable(element) {
        const getJson = await this.#getJson();
        let html = '';
        try {
            if(typeof(element) !== 'object'){
                throw 'fz ';
            }
            getJson.categories.forEach(category => {
                html += `
                <tr>
                    <td class="p-3 border-[1px] border-gray-300 bg-gray-200">${category.name}</td>
                    <td class="p-3 border-[1px] border-gray-300 bg-gray-50">
                `;
                category.words.forEach(word => {
                    html += `${word}, `;
                });
                html += `
                    </td>
                </tr>
                `;
            });
        } catch (error) {
            console.log(error)
        }
        return html;
    }

    /**
     * @function counter of word in textarea
     * @param {*} string data 
     * @returns 
     */
    counter(data){
        try {
            if(data !== ''){
                let str = data.replace(/[0-9 `~!@#$%^&*()_|+\-–=?;:'"“”’,.<>\{\}\[\]\\\/]/g, ' ');
                let array = [];
                str.split(' ').forEach(index => {
                    if(index !== ' ' && index !== ''){
                        array.push(index)
                    }
                });
                return array.length;
            } else {
                return '0';
            }
        } catch (error) {
            console.log(error);
        }
    }

}