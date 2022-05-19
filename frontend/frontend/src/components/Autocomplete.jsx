import { useState } from "react";

function Suggestions({ data = [], onSelect }) {
  return (
    <div className="flex justify-center">
      <ul className="absolute text-lg border-1 z-50 rounded dark:text-white">
        {data.map((suggestion) => (
          // eslint-disable-next-line
          <li
            key={suggestion.id}
            className="pr-52 leading-10 bg-white hover:bg-slate-100 capitalize text-mada dark:text-black pl-4 py-1 z-50"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AutoComplete({ data, onSelect, onClick }) {
  // Tableau dans lequel s'ajoutent les ingrédients épinglés
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Ingrédients suggérés dans la liste de suggestion
  const [suggestions, setSuggestions] = useState([]);

  // Affiche la liste de suggestion (true) ou non (false)
  const [suggestionsActive, setSuggestionsActive] = useState(false);

  // Capte les caractères tapés dans la barre de recherche
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  // Décompte des ingrédients
  const [count, setCount] = useState(3);

  /**
   * Renvoie si la suggestion sélectionnée fait partie de la
   * liste des suggestions existantes
   */
  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedSuggestion(value);

    if (value.length > 2) {
      const filterSuggestions = data.filter(
        (suggestion) => suggestion.name.indexOf(value.toLowerCase()) > -1
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }

    if (selectedIngredients.length >= 3) {
      setSuggestionsActive(false);
    }
  };

  const handleSuggestionChange = (value) => {
    setSuggestions([]);
    setSelectedSuggestion(value);
    setSuggestionsActive(false);
    setSelectedSuggestion("");

    const newSelectedIngredients = [...selectedIngredients, value];
    setSelectedIngredients(newSelectedIngredients);
    onSelect(newSelectedIngredients);

    setCount((oldCount) => oldCount - 1);
  };

  /** au clic en dehors de la liste de suggestions,
   * celle-ci se replie
   */
  const handleClick = () => {
    setSuggestionsActive(false);
  };

  /** au clic sur la croix, l'ingrédient sélectionné
   * est supprimé
   */
  const handleDelete = (id) => {
    const deletableIngredient = selectedIngredients.filter((ingredient) => {
      return ingredient.id !== id;
    });
    setSelectedIngredients(deletableIngredient);
    onClick(deletableIngredient);
    setCount((oldCount) => oldCount + 1);
  };

  return (
    // eslint-disable-next-line
    <div onClick={handleClick}>
      <h2 className="flex justify-center mb-4 mt-12 text-mada text-xl text-gray-800 dark:text-white ">
        <p className="mr-1 normal-case">
          {selectedIngredients.length === 3 ? (
            "You cannot add more ingredients..."
          ) : (
            <>
              Choose <span className="font-bold text-atma mr-1">{count}</span>
              ingredient{selectedIngredients.length === 2 ? "" : "s"}:
            </>
          )}
        </p>
      </h2>
      <form>
        <div className="flex justify-center">
          <input
            type="text"
            className="max-w-[90%] h-14 w-96 pl-6 pr-20 border-1 border-black rounded-3xl focus:shadow focus:outline-none disabled:bg-gray-200"
            placeholder="Add ingredients"
            value={selectedSuggestion}
            onChange={handleChange}
            disabled={selectedIngredients.length >= 3}
          />
        </div>
      </form>
      <div>
        {suggestionsActive && (
          <Suggestions data={suggestions} onSelect={handleSuggestionChange} />
        )}
      </div>
      <ul className="flex flex-col max-w-[50%] md:max-w-[100%] m-auto justify-center md:flex-row">
        {selectedIngredients.slice(0, 3).map((ingredient) => (
          <li
            className="mx-2 py-1 px-1 pl-4 mt-8 border-1 border-white dark:border-gray-800 drop-shadow text-white dark:text-zinc-800 flex justify-between rounded-3xl z-0 bg-[#8ddc93] cursor-default text-mada dark:bg-[#ffdb20]"
            key={ingredient.id}
          >
            {/* ingrédients épinglés */}
            {ingredient.name}
            <button
              type="button"
              key={ingredient.id}
              onClick={() => handleDelete(ingredient.id)}
              className="ml-2 font-bold text-atma hover:bg-green-800 bg-green-600 rounded-3xl px-2 dark:bg-yellow-500 hover:dark:bg-yellow-600"
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
