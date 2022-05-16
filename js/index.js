// const getAllLists = async () => {
// 	try {
// 		const response = await fetch("http://localhost:5002/api/lists");

// 		if (!response.ok) {
// 			throw new Error("Impossible de récupérer les listes");
// 		}
// 		const data = await response.json();

// 		console.log(data);
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// getAllLists();

import Kanban from "./Kanban.js";

new Kanban(document.querySelector(".kanban"));
