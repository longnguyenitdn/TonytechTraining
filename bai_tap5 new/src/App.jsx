import { Outlet } from "react-router-dom";
import HouseProvider from "./contexts/HouseProvider";
import InvoiceProvider from "./contexts/InvoiceProvider";
import LoadingProvider from "./contexts/LoadingProvider";

function App() {
  return (
    <LoadingProvider>
      <InvoiceProvider>
        <HouseProvider>
          <Outlet />
        </HouseProvider>
      </InvoiceProvider>
    </LoadingProvider>
  );
}

export default App;
