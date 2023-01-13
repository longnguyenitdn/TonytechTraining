import "../../styles/Home.css";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Body from "../../components/Body";
import { addNewLabel, editLabel, deleteLabel, getLabel } from "../../api/label";

class Home extends React.Component {
  state = {
    deleteLabelId: null,
    deleteConfirm: false,
    isEditLabel: false,
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

  handleAddNewLabel = (label) => {
    this.setLoading(true);
    addNewLabel(label)
      .then((data) => {
        this.setState({
          labelList: [data, ...this.state.labelList],
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  handleDeleteLabel = (id) => {
    this.setLoading(true);
    deleteLabel(id)
      .then(() => {
        let currentList = this.state.labelList;
        currentList = currentList.filter((item) => item.id !== id);
        this.setState({
          labelList: currentList,
          deleteConfirm: false,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  handleEditLabel = (label) => {
    let isExist = false;
    isExist = this.state.labelList.some((item) => {
      if (label.name === item.name) {
        if (item.id !== label.id) {
          this.setState({
            isExistLabel: true,
          });
          return true;
        }
        return true;
      }
    });

    if (!isExist) {
      this.setLoading(true);
      editLabel(label)
        .then(() => {
          let currentList = this.state.labelList;
          currentList = currentList.map((item) => {
            if (item.id === label.id) {
              item.name = label.name;
            }
            return item;
          });
          this.setState({
            labelList: currentList,
            isExistLabel: false,
            isEditLabel: false,
          });
        })

        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.setLoading(false);
        });
    }
  };

  handleShowEditBtn = () => {
    this.setState({
      isEditLabel: true,
    });
  };

  handleShowHideDeleteConfirm = (id) => {
    this.setState({
      deleteConfirm: !this.state.deleteConfirm,
      deleteLabelId: id,
    });
  };

  render() {
    return (
      <>
        <Header />
        <Sidebar
          deleteLabelId={this.state.deleteLabelId}
          handleShowHideDeleteConfirmFunc={this.handleShowHideDeleteConfirm}
          deleteConfirm={this.state.deleteConfirm}
          isEditLabel={this.state.isEditLabel}
          handleShowEditBtnFunc={this.handleShowEditBtn}
          isExistLabel={this.state.isExistLabel}
          handleEditLabelFunc={this.handleEditLabel}
          labelList={this.state.labelList}
          setLoading={this.setLoading}
          statusLoading={this.state.statusLoading}
          handleAddNewLabelFunc={this.handleAddNewLabel}
          handleDeleteLabelFunc={this.handleDeleteLabel}
        />
        <Body
          setLoading={this.setLoading}
          statusLoading={this.state.statusLoading}
        />
      </>
    );
  }
}
export default Home;
