import { ref } from "vue";
const createCard = () => ({
  id: crypto.randomUUID(),
  front: {
    text: "",
    description: "",
    img: new FormData(),
  },
  back: {
    text: "",
    description: "",
    img: new FormData(),
  },
});

export const useCards = () => {
  const cards = ref([createCard()]);

  const addCard = () => {
    cards.value.push(createCard());
  };

  const deleteCard = (id) => {
    cards.value = cards.value.filter((card) => card.id !== id);
  };

  return {
    cards,
    addCard,
    deleteCard,
  };
};
