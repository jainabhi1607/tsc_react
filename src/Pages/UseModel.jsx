import ModalComponent from "./ModalComponent";

const UseModel = () => {
  return (
    <div className="container mt-5">
      <h2>Reusable Bootstrap Modal Example</h2>

      {/* Trigger Button */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
      >
        Open Modal
      </button>

      {/* Reusable Modal */}
      <ModalComponent
        id="myModal"
        title="My Reusable Modal"
        body={<p>This modal can be reused across all pages 🚀</p>}
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save Changes
            </button>
          </>
        }
      />
    </div>
  );
};

export default UseModel;
