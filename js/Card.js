import KanbanAPI from "./API/KanbanAPI.js";
import DropZone from "./DropZone.js";

export default class Card {
	constructor(id, content) {
		const bottomDropZone = DropZone.createDropZone();
		this.elements = {};
		this.elements.root = Card.createRoot();
		this.elements.content = this.elements.root.querySelector(
			".kanban__card-content"
		);
		this.elements.root.dataset.id = id;
		this.elements.content.textContent = content;
		this.content = content;
		this.elements.root.appendChild(bottomDropZone);

		const onBlur = () => {
			const newContent = this.elements.content.textContent.trim();
			console.log(this.content);
			console.log(newContent);
			if (newContent === this.content) {
				return;
			}
			this.content = newContent;
			KanbanAPI.updateCardAPI(id, { content: this.content });
		};

		this.elements.content.addEventListener("blur", onBlur);
		this.elements.root.addEventListener("dblclick", () => {
			const check = confirm("Êtes-vous sûr de vouloir supprimer cette carte ?");

			if (check) {
				// KanbanAPI.deleteCard(id);
				(async () => await KanbanAPI.deleteCardApi(id))();
				this.elements.content.removeEventListener("blur", onBlur);
				this.elements.root.parentElement.removeChild(this.elements.root);
			}
		});

		this.elements.root.addEventListener("dragstart", (e) => {
			e.dataTransfer.setData("text/plain", id);
		});

		this.elements.content.addEventListener("drop", (e) => {
			e.preventDefault();
		});
	}

	static createRoot() {
		const range = document.createRange();
		range.selectNode(document.body);
		return range.createContextualFragment(`
        
        <div class="kanban__card" draggable="true">
				<div class="kanban__card-content" contenteditable></div>
		</div>
        
        `).children[0];
	}
}
