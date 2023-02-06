import "./App.css";
import Home from "./home";
import { UserProvider } from "../context/UserContext";
function App() {
  const person = { name: "long", age: 32 };
  return (
    <UserProvider value={person}>
      <Home />
    </UserProvider>
  );
}
export default App;
