import React from "react";
class DeleteModalConfirm extends React.Component {
  render() {
    return (
      <>
        <div id="remove_label_wrap" class="remove-label-wrap"></div>
        <div
          id="remove_label_confirm_modal"
          class="remove-confirm-modal bg-white "
        >
          <div class="remove-confirm-modal-cover">
            <input type="hidden" id="removeId" />
            <p class="text-black">
              We’ll delete this label and remove it from all of your Keep notes.
              Your notes won’t be deleted.
            </p>
            <div class="remove-confirm-modal-btn">
              <button
                onClick={() => this.props.handleShowHideDeleteConfirmFunc()}
                id="remove_cancel_btn"
                class="btn-close button-icon text-black cursor"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  this.props.handleDeleteLabelFunc(this.props.deleteLabelId)
                }
                id="remove_btn"
                class="btn-close button-icon cursor text-blue"
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
