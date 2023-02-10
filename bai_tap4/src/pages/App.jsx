import "./App.css";
import Home from "./home";
import NoteProvider from "../contexts/NoteProvider";
import LabelProvider from "../contexts/LabelProvider";
import LoadingProvider from "../contexts/LoadingProvider";
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
