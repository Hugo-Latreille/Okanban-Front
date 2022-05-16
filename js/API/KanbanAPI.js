export default class KanbanAPI {
	static async getLists() {
		try {
			const response = await fetch("http://localhost:5002/api/lists");

			if (!response.ok) {
				throw new Error("Impossible de récupérer les listes");
			}
			const data = await response.json();

			return data;
		} catch (error) {
			console.error(error);
		}
	}

	static async getCards(listId) {
		try {
			const response = await fetch(
				`http://localhost:5002/api/lists/${listId}/cards`
			);

			if (!response.ok) {
				throw new Error("Impossible de récupérer les listes");
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(error);
		}

		// const list = read().find((list) => list.id === listId);

		// if (!list) {
		// 	return [];
		// }

		// return list.cards;
	}

	// static insertCard(listId, content) {
	// 	const data = read();
	// 	const list = data.find((list) => list.id === listId);
	// 	const newCard = {
	// 		id: Math.floor(Math.random() * 100000),
	// 		content: content,
	// 	};

	// 	if (!list) {
	// 		throw new Error("List n'existe pas");
	// 	}
	// 	list.cards.push(newCard);
	// 	save(data);
	// }

	static async insertCardApi(listId, content, position) {
		try {
			const response = await fetch(`http://localhost:5002/api/cards/`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: content,
					position: position,
					color: "blue",
					list_id: listId,
				}),
			});

			console.log(response);

			if (!response.ok) {
				throw new Error("Problème " + response.status);
			}

			const data = await response.json();
			console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	}

	// static updateCard(cardId, updatedCard) {
	// 	const data = read();
	// 	const [card, currentList] = (() => {
	// 		for (const list of data) {
	// 			const card = list.cards.find((card) => card.id == cardId);

	// 			if (card) {
	// 				return [card, list];
	// 			}
	// 		}
	// 	})();

	// 	if (!card) {
	// 		throw new Error("card not found.");
	// 	}

	// 	card.content =
	// 		updatedCard.content === undefined ? card.content : updatedCard.content;

	// 	// Update list and position
	// 	if (
	// 		updatedCard.listId !== undefined &&
	// 		updatedCard.position !== undefined
	// 	) {
	// 		const targetList = data.find((list) => list.id == updatedCard.listId);

	// 		if (!targetList) {
	// 			throw new Error("Target list not found.");
	// 		}

	// 		// Delete the card from it's current list
	// 		currentList.cards.splice(currentList.cards.indexOf(card), 1);

	// 		// Move card into it's new list and position
	// 		targetList.cards.splice(updatedCard.position, 0, card);
	// 	}

	// 	save(data);
	// }
	static async updatePositionAPI(cardId, positionId) {
		try {
			const response = await fetch(
				`http://localhost:5002/api/cards/${cardId}/position/${positionId}`,
				{
					method: "PATCH",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					// body: JSON.stringify(updatedCard),
				}
			);

			console.log(cardId, positionId);

			if (!response.ok) {
				throw new Error("Problème " + response.status);
			}

			const data = await response.json();
			console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	}
	static async updateCardAPI(cardId, updatedCard) {
		try {
			const response = await fetch(
				`http://localhost:5002/api/cards/${cardId}`,
				{
					method: "PATCH",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updatedCard),
				}
			);

			console.log(response);

			if (!response.ok) {
				throw new Error("Problème " + response.status);
			}

			const data = await response.json();
			console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	}

	// static deleteCard(cardId) {
	// 	const data = read();

	// 	for (const list of data) {
	// 		const card = list.cards.find((card) => card.id == cardId);

	// 		if (card) {
	// 			list.cards.splice(list.cards.indexOf(card), 1);
	// 		}
	// 	}

	// 	save(data);
	// }

	static async deleteCardApi(cardId) {
		try {
			const response = await fetch(
				`http://localhost:5002/api/cards/${cardId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error("Problème " + response.status);
			}
			return console.log(`Carte ${cardId} supprimée de la bdd`);
		} catch (error) {
			console.error(error);
		}
	}
}

const read = () => {
	const json = localStorage.getItem("kanban-data");

	if (!json) {
		return [
			{
				id: 1,
				cards: [],
			},
			{
				id: 2,
				cards: [],
			},
			{
				id: 3,
				cards: [],
			},
		];
	}

	return JSON.parse(json);
};

const save = (data) => {
	localStorage.setItem("kanban-data", JSON.stringify(data));
};
