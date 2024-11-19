import {createStore} from 'tinybase';

const store = createStore();

store.setTable('items', {
    1:{name: 'apple', quantity: 12 },
    2:{name: 'banana', quantity: 6},
    3:{name: 'cherry', quantity: 10},
});

export default store;



// // ItemsList Component
// const ItemsList = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     // Load data from TinyBase into the component state
//     const initialItems = store.getTable('items');
//     setItems(Object.entries(initialItems).map(([id, data]) => ({ id, ...data })));
//   }, []);

//   return (
//     <div>
//       <h2>Items List</h2>
//       <ul>
//         {items.map(({ id, name, quantity }) => (
//           <li key={id}>
//             {name}: {quantity}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
