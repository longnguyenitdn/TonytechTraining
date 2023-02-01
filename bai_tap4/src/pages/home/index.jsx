import "../../styles/home.css";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Body from "../../components/Body";
import { getLabel } from "../../api/label";

class Home extends React.Component {
  state = {
    isExistLabel: false,
    statusLoading: false,
    labelList: [],
  };
  setLoading = (status) => {
    this.setState({
      statusLoading: status,
    });
  };

  componentDidMount() {
    this.setLoading(true);
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
        this.setLoading(false);
      });
  }

  setLabelList = (newList) => {
    this.setState({
      labelList: newList,
    });
  };

  render() {
    return (
      <>
        <Header />
        <Sidebar
          labelList={this.state.labelList}
          setLabelListFunc={this.setLabelList}
          setLoading={this.setLoading}
          statusLoading={this.state.statusLoading}
        />
        <Body
          setLoading={this.setLoading}
          statusLoading={this.state.statusLoading}
          labelList={this.state.labelList}
        />
      </>
    );
  }
}
export default Home;
