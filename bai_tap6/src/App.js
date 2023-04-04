import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loading from "./components/loading";
import { settingSelector } from "./redux/selectors/setting.selector";

function App() {
  const loadingStatus = useSelector(settingSelector);

  return (
    <>
      {loadingStatus === true && <Loading />}
      <Outlet />
    </>
  );
}

export default App;
