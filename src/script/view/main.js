
function main(){

    const getCocktail = (url) => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if(responseJson.error){
                    showResponseMessage(responseJson.message);
                }
                else{
                    render(responseJson.drinks);
                }
            })
            .catch(error => {
                showResponseMessage(error);
            })
    }

    const showResponseMessage = (message = "Check your internet connection") => {
        console.log(message);
    };

    const render = (cocktails) => {
        const listCocktail = document.querySelector("#listCocktail");
        listCocktail.innerHTML = "";

        cocktails.forEach(cocktail => {
            listCocktail.innerHTML += `
            <card-item 
                src="${cocktail.strDrinkThumb}/preview"
                idDrink="${cocktail.idDrink}"
                title="${cocktail.strDrink}">
            </card-item>
            `
        })

        const detailButton = document.querySelectorAll(".modal-detail-button");
        
        detailButton.forEach(button=>{
            button.addEventListener("click", function(){
                let idDrink = this.getAttribute("data-id");
                console.log(idDrink);
                fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
                    .then(response => {
                        return response.json();
                    })
                    .then(responseJson => {
                        if(responseJson.error){
                            showResponseMessage(responseJson.message);
                        }
                        else{
                            renderDetail(responseJson.drinks[0]);
                        }
                    })
                    .catch(error => {
                        showResponseMessage(error);
                    })
            })
        })
    }

    const renderDetail = (cocktail) =>  {
        const modalBody = document.querySelector(".modal-body");

        modalBody.innerHTML = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${cocktail.strDrinkThumb}/preview" class="img-fluid" alt="poster">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${cocktail.strDrink}</h4></li>
                            <li class="list-group-item"><strong>Category : </strong>${cocktail.strCategory}</li>
                            <li class="list-group-item"><strong>Alcoholic : </strong>${cocktail.strAlcoholic}</li>
                            <li class="list-group-item"><strong>Instructions : </strong>${cocktail.strInstructions}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    }

    

    const alcololicUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";
    const nonalchololicUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
    const ordinaryUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";
    const cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";
    const searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    const alcoholicButton = document.querySelector("#alcoholic");
    const nonAlcoholicButton = document.querySelector("#nonAlcoholic");
    const ordinaryButton = document.querySelector("#ordinary");
    const cocktailButton = document.querySelector("#cocktail");
    const inputSearch = document.querySelector("#input-search");
    const buttonSearch = document.querySelector("#button-search");

    alcoholicButton.addEventListener("click", () => getCocktail(alcololicUrl));
    nonAlcoholicButton.addEventListener("click", () => getCocktail(nonalchololicUrl));
    ordinaryButton.addEventListener("click", () => getCocktail(ordinaryUrl));
    cocktailButton.addEventListener("click", () => getCocktail(cocktailUrl));
    buttonSearch.addEventListener("click", () => getCocktail(searchUrl + inputSearch.value));
    

    
}

export default main;
