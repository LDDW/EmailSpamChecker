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
        try {
            if(data !== undefined && data !== ''){
                const arrayWithAllWords = await this.#getArrayWithAllWords();
                arrayWithAllWords.forEach(word => {
                    if(data.toLowerCase().indexOf(word) > - 1){
                        console.log(word)
                    }
                })
            } else {
                throw 'data is empty';
            }
        } catch (error) {
            console.log(error)
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

}