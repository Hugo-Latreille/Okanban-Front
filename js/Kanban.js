import KanbanAPI from "./API/KanbanAPI.js";
import List from "./List.js";

export default class Kanban {
	constructor(root) {
		this.root = root;

		(async () => {
			const lists = await KanbanAPI.getLists();
			lists.forEach((list) => {
				const listView = new List(list.id, list.name);
				this.root.appendChild(listView.elements.root);
			});
		})();

		// Kanban.lists().forEach((list) => {
		// 	const listView = new List(list.id, list.name);
		// 	this.root.appendChild(listView.elements.root);
		// });
	}

	static lists() {
		return [
			{
				id: 1,
				name: "Not started",
			},
			{
				id: 2,
				name: "In progress",
			},
			{
				id: 3,
				name: "Completed",
			},
		];
	}
}
