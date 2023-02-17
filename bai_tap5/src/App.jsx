import "./App.css";
import Home from "./components/Home";
import HouseProvider from "./contexts/HouseProvider";
import LoadingProvider from "./contexts/LoadingProvider";
function App() {
  return (
    <LoadingProvider>
      <HouseProvider>
        <Home />
      </HouseProvider>
    </LoadingProvider>
  );
}

export default App;
