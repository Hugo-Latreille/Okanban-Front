import KanbanAPI from "./API/KanbanAPI.js";

export default class DropZone {
	static createDropZone() {
		const range = document.createRange();

		range.selectNode(document.body);

		const dropZone = range.createContextualFragment(`
			<div class="kanban__dropzone"></div>
		`).children[0];

		dropZone.addEventListener("dragover", (e) => {
			e.preventDefault();
			dropZone.classList.add("kanban__dropzone--active");
		});

		dropZone.addEventListener("dragleave", () => {
			dropZone.classList.remove("kanban__dropzone--active");
		});

		dropZone.addEventListener("drop", (e) => {
			e.preventDefault();
			dropZone.classList.remove("kanban__dropzone--active");

			const listElement = dropZone.closest(".kanban__list");
			const listId = Number(listElement.dataset.id);
			const dropZonesInList = Array.from(
				listElement.querySelectorAll(".kanban__dropzone")
			);
			const droppedIndex = dropZonesInList.indexOf(dropZone);
			const cardId = Number(e.dataTransfer.getData("text/plain"));
			const droppedCardElement = document.querySelector(
				`[data-id="${cardId}"]`
			);
			const insertAfter = dropZone.parentElement.classList.contains(
				"kanban__card"
			)
				? dropZone.parentElement
				: dropZone;

			if (droppedCardElement.contains(dropZone)) {
				return;
			}
			console.log(droppedIndex + 1);
			insertAfter.after(droppedCardElement);
			KanbanAPI.updatePositionAPI(cardId, droppedIndex);
		});

		return dropZone;
	}
}
