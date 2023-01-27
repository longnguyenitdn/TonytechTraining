import React from "react";
class DeleteModalConfirm extends React.Component {
  render() {
    return (
      <>
        <div id="remove_label_wrap" className="remove-label-wrap"></div>
        <div
          id="remove_label_confirm_modal"
          className="remove-confirm-modal bg-white "
        >
          <div className="remove-confirm-modal-cover">
            <input type="hidden" id="removeId" />
            <p className="text-black">
              We’ll delete this label and remove it from all of your Keep notes.
              Your notes won’t be deleted.
            </p>
            <div className="remove-confirm-modal-btn">
              <button
                onClick={() => this.props.handleShowHideDeleteConfirmFunc()}
                id="remove_cancel_btn"
                className="btn-close button-icon text-black cursor"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  this.props.handleDeleteLabelFunc(this.props.deleteLabelId)
                }
                id="remove_btn"
                className="btn-close button-icon cursor text-blue"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default DeleteModalConfirm;
