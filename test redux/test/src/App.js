import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadPost } from "./redux/actions/postAction";
import { useEffect } from "react";
function App() {
  const data = useSelector((state) => state.postReducer.data);
  const requesting = useSelector((state) => state.postReducer.requesting);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPost());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {requesting ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : data?.length > 0 ? (
          <div>
            {data.map((item) => (
              <p key={item.id}>{item.id}</p>
            ))}
          </div>
        ) : (
          <h2>Data is empty</h2>
        )}
      </header>
    </div>
  );
}

export default App;
