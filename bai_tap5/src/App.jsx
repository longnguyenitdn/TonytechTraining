import { Outlet } from "react-router-dom";
import HouseProvider from "./contexts/HouseProvider";
import InvoiceProvider from "./contexts/InvoiceProvider";
import LoadingProvider from "./contexts/LoadingProvider";

function App() {
  return (
    <LoadingProvider>
      <HouseProvider>
        <InvoiceProvider>
          <Outlet />
        </InvoiceProvider>
      </HouseProvider>
    </LoadingProvider>
  );
}

export default App;
