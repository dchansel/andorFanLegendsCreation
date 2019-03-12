import Vue from 'vue';
import Vuex from 'vuex';
import Nanoid from 'nanoid';

Vue.use(Vuex);

/**
 * Create a Slug from a string
 * @param {String} string 
 * @return {String}
 */
function slugify(string) {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
  const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
  const p = new RegExp(a.split('').join('|'), 'g')
  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}


/**
 * 
 * @param {object} card1 
 * @param {object} card2
 * @returns {number} 
 */
const sorter = (card1, card2) => {
  // If not the same type order by type
  if(card2.type !== card1.type) {
    return (card2.type === 'letter') ? 1 : -1;
  }

  // Sort by name
  return card1.name.localeCompare(card2.name);
};


export default new Vuex.Store({
  //strict: true,
  state: {
    name: 'Die dunklen weiten von Andor',
    newCardOpenIndex: 1,
    showPdf: false,
    cards: [
      {
        type: 'letter',
        name: 'A1',
        slug: 'a1',
        text: 'Führt zuerst die Anweisungen auf der **Checkliste** aus.\n\nAnschließend legt ihr zusätzlich folgenden Material neben dem Spielplan bereit:\n* Legt die Hexte, die 15 Kreaturplättchen, den Gegenstand Gibt und 3 schwarze Würfel bereit.\n* Legen **Sternchen auf D, H und N** der Legendenleiste.\n\n*In Andor trug sich eine Geschichte zu, die Ging so:....*\n\nStellt alle Helden auf das Feld **57.**\n\n***\n**Aufgabe:**\nDie Helden müssen die Burg verteidigen und den **die Dunkelheit** daran hindern, alle Bauern zu verschlingen bevor der Erzähler den Buchstaben **Feld H** erreicht hat.\n***',
        id: 1
      },
      {
        type: 'custom',
        name: 'In der Dunkelheit',
        slug: 'in-der-dunkelheit',
        subname: 'Diese Karte wird aufgedeckt, sobald die Dunkelheit in der Burg ist',
        text: '*Nach dem Sieg über den Drachen Tarok ist es Varkur gelungen, ein Drachenei in seinen Besitz zu bringen. Einen zweiten Drachen würde Andor nicht überleben, doch glücklicherweise konnten die Helden das Drachenei stehlen. Doch die eigentliche Aufgabe fängt gerade erst an: Um das Drachenei zu zerstören, müssen die Helden mehr altes Wissen über die Drachen zusammentragen und gleichzeitig den Bewohnern Andors helfen, sich von Taroks Angriff zu erholen.*\n\n***\n**Legendenziel:**\nAlle Feld um die Brug (Feld 22, 34, 45, 34 und 33) müssen von der Dunkelheit befreit sein.\n***\n**Wichtig:** Für jeden Feld, das ein Held die Dunkelheit bekämpft, muss der Held Willenspunkte abgeben:\nbei **2** Spielern **pro Feld 2 Willenspunkte**\nbei **3** Spielern **pro Feld 3 Willenspunkte**\nbei **4** Spielern **pro Feld 4 Willenspunkte**\n',
        id: 2
      }
    ]
  },
  mutations: {
    setName(state, newName) {
      state.name = newName;
    },
    setSlug(state, newName){

      // Create new Slug
      let slug = slugify(newName);

      // Add 1 if there a other cards have the same slug
      while(state.cards.filter(i => i.slug === slug && i.id !== state.newCardOpenIndex).length !== 0){
        slug += 1;
      }

      // Set new Slug
      state.cards.find(i => i.id === state.newCardOpenIndex).slug = slug;
    },
    loadState(state, newState){
      state.name = newState.name;
      state.newCardOpenIndex = newState.newCardOpenIndex;
      state.cards = newState.cards;

      // If slugs a missing
      if(state.cards.some(i => typeof i.slug === "undefined")){
        state.cards.forEach(card => {
          card.slug = slugify(card.name);
        });
      }
    },
    deleteCard(state, cardId) {
      
      // if this card is currently open
      if(state.newCardOpenIndex === cardId){
        state.newCardOpenIndex = null;
      }

      state.cards = state.cards.filter(i => i.id != cardId);
    },
    editCard(state, cardId) {
      state.newCardOpenIndex = cardId;
    },
    showPdf(state, visible){
      state.showPdf = visible;
    },
    closeCardWindow(state) {
      state.newCardOpenIndex  = null;
    },
    addCard(state) {

      const newId = Nanoid();
      state.cards.push({
        name: '',
        slug: '',
        subname: '',
        type: 'letter',
        text: '',
        id: newId
      });

      state.newCardOpenIndex = newId;
    }
  },
  getters: {
    getCards: state => {
      return [...state.cards].sort(sorter);
    }
  }
});