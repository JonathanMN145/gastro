
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { getDatabase, ref, push, get, child } from 'firebase/database';
import { useEffect, useState } from 'react';

// Renamed the local database variable to avoid conflict
const dbInstance = getDatabase();  // Get database instance from the Firebase app

// Function to check if the Firebase database connection is working
const checkDatabaseConnection = async () => {
  try {
    const dbRef = ref(dbInstance);
    const snapshot = await get(child(dbRef, 'users'));
    if (snapshot.exists()) {
      console.log("Database connected and users data exists:", snapshot.val());
    } else {
      console.log("No data available in 'users' node.");
    }
  } catch (error) {
    console.error("Error connecting to Firebase Database:", error);
  }
};

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Check the database connection when the component mounts
    checkDatabaseConnection();

    // You can fetch users data here if you need it
    const usersRef = ref(dbInstance, 'users');
    push(usersRef, {
      name: 'Alice',
      email: 'alice@example.com'
    });

    // You can use get() to fetch and update your state as needed
    get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        setUsers(Object.values(snapshot.val()));
      } else {
        console.log("No users found.");
      }
    }).catch(error => {
      console.error("Error fetching users:", error);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Welcome to the App</h1>} />
          <Route path="/users" element={<UsersList users={users} />} />
        </Routes>
      </Router>
    </div>
  );
}

// A simple UsersList component to display users
function UsersList({ users }) {
  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// // Home Component
// const Home = () => {
//   return (
//     <div>
//       <h1>My Personal Fan Page</h1>
//       <p>Welcome to the home page of my site!</p>
//     </div>
//   );
// };



// // App Component
// function App() {
//   return (
//     <Router>
//       <nav>
//         {/* Navigation Links */}
//         <Link to="/">Home</Link> | <Link to="/about">About</Link> |{' '}
//         <Link to="/items">Items</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/items" element={<ItemsList />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
