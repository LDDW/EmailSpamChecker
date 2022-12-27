export class Checker {

    async #getJson(){
        return fetch('./js/checker.json')
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => console.log(error));
    }
  
    async check(){
        const a = await this.#getJson();
        console.log(a);
    }

}