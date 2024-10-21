import './App.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon, removeItem, suma } from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const count = useSelector((state) => state.contador);

  const handleAddItem = () => {
    dispatch(getPokemon(count));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div>
      <h1>Redux Example</h1>
      <button onClick={handleAddItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
