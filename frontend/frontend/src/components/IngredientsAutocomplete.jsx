import React, { useState, useEffect } from "react";

import { getIngredientsList } from "@services/api.js";
import AutoComplete from "@components/Autocomplete";

export default function IngredientsAutocomplete({ onSelect, onClick }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    (async function getList() {
      setIngredients(
        await getIngredientsList((data) => [
          ...ingredients,
          { id: data.id, name: data.name },
        ])
      );
    })();
  }, []);

  if (!ingredients) {
    return null;
  }

  return (
    <AutoComplete data={ingredients} onSelect={onSelect} onClick={onClick} />
  );
}
