
class CardItem extends HTMLElement{
    connectedCallback(){
        this.title = this.getAttribute("title") || null;
        this.idDrink = this.getAttribute("idDrink") || null;
        this.src = this.getAttribute("src") || null;

        this.innerHTML= `
        <div class="card m-1">
        <img src="${this.src}" class="card-img-top" alt="poster">
        <div class="card-body">
            <h6 class="card-title">${this.title}</h6>
            <button type="button" class="btn btn-primary btn-sm modal-detail-button" data-bs-toggle="modal" data-bs-target="#cocktailModal" data-id="${this.idDrink}">Get Details</button>
        </div>
        </div>
        `;
    }

}

customElements.define("card-item", CardItem);
