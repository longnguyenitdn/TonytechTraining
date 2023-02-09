import React from "react";
import { getLabel } from "../api/label";
import { LoadingContext } from "./LoadingProvider";
export const LabelContext = React.createContext();

class LabelProvider extends React.Component {
  static contextType = LoadingContext;
  state = {
    isExistLabel: false,
    labelList: [],
    activeId: null,
  };
  componentDidMount() {
    let provider = this.context;
    provider.setLoading(true);
    getLabel()
      .then((data) => {
        this.setState({
          labelList: data,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        provider.setLoading(false);
      });
  }

  setLabelList = (newList) => {
    this.setState({
      labelList: newList,
    });
  };
  handleActiveSidebarMenu = (e) => {
    this.setState({
      activeId: e.target.id,
    });
  };
  render() {
    return (
      <LabelContext.Provider
        value={{
          state: this.state,
          setLabelList: this.setLabelList,
          handleActiveSidebarMenu: this.handleActiveSidebarMenu,
        }}
      >
        {this.props.children}
      </LabelContext.Provider>
    );
  }
}
export default LabelProvider;
