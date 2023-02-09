import "./App.css";
import Home from "./home";
import NoteProvider from "../Contexts/NoteProvider";
import LabelProvider from "../Contexts/LabelProvider";
import LoadingProvider from "../Contexts/LoadingProvider";
function App() {
  return (
    <LoadingProvider>
      <LabelProvider>
        <NoteProvider>
          <Home />
        </NoteProvider>
      </LabelProvider>
    </LoadingProvider>
  );
}
export default App;
