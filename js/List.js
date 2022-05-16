import KanbanAPI from "./API/KanbanAPI.js";
import Card from "./Card.js";
import DropZone from "./DropZone.js";

export default class List {
	constructor(id, name) {
		const topDropZone = DropZone.createDropZone();
		this.elements = {};
		this.elements.root = List.createRoot();
		this.elements.title = this.elements.root.querySelector(
			".kanban__list-title"
		);
		this.elements.cards = this.elements.root.querySelector(
			".kanban__list-cards"
		);
		this.elements.addCard =
			this.elements.root.querySelector(".kanban__add-card");

		this.elements.root.dataset.id = id;
		this.elements.title.textContent = name;
		this.elements.cards.appendChild(topDropZone);
		this.elements.addCard.addEventListener("click", async () => {
			const newCard = await KanbanAPI.insertCardApi(id, "");
			console.log(await newCard.id);
			this.renderCard(newCard);
		});
		(async () => {
			const cards = await KanbanAPI.getCards(id);
			cards.forEach((card) => {
				this.renderCard(card);
			});
		})();

		// KanbanAPI.getCards(id).forEach((card) => {
		// 	this.renderCard(card);
		// });
	}

	static createRoot() {
		const range = document.createRange();
		range.selectNode(document.body);
		return range.createContextualFragment(`
        
        <div class="kanban__list">
				<div class="kanban__list-title"></div>
				<div class="kanban__list-cards"></div>
				<button class="kanban__add-card" type="button">+ Add</button>
		</div>
        
        `).children[0];
	}

	renderCard(data) {
		try {
			const card = new Card(data.id, data.content);
			this.elements.cards.appendChild(card.elements.root);
		} catch (error) {
			console.log(error);
		}
	}
}
