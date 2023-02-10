import "../../styles/home.css";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Body from "../../components/Body";
import { NoteContext } from "../../contexts/NoteProvider";
import EditNote from "../../components/EditNote";
import LoadingModal from "../../components/LoadingModal";
import { LoadingContext } from "../../contexts/LoadingProvider";

class Home extends React.Component {
  render() {
    return (
      <LoadingContext.Consumer>
        {(loadingProvider) => (
          <NoteContext.Consumer>
            {(noteProvider) => (
              <>
                <div hidden={loadingProvider.statusLoading === false}>
                  <LoadingModal />
                </div>
                <Header />
                <Sidebar />
                <Body />
                {noteProvider.isEdit === true && <EditNote />}
              </>
            )}
          </NoteContext.Consumer>
        )}
      </LoadingContext.Consumer>
    );
  }
}
export default Home;
