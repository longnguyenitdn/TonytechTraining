import React from "react";
export const LoadingContext = React.createContext();
class LoadingProvider extends React.Component {
  state = {
    statusLoading: null,
  };
  setLoading = (status) => {
    this.setState({
      statusLoading: status,
    });
  };
  render() {
    return (
      <LoadingContext.Provider
        value={{
          state: this.state,
          setLoading: this.setLoading,
        }}
      >
        {this.props.children}
      </LoadingContext.Provider>
    );
  }
}
export default LoadingProvider;
