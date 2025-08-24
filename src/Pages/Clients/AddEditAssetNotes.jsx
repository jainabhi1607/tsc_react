import React, { useState, useEffect } from "react";
import ModalComponent from "../../Components/ModalComponent";
import { encryptPhpCompatible } from "../../cryptoHelper";

const AddEditAssetNotes = ({ show, handleClose, assetId }) => {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch user data when modal opens
  useEffect(() => {
    if (show) {
      setLoading(true);
      const edit = encryptPhpCompatible("edit");
      const first = encryptPhpCompatible(assetId.toString() + "first");
      const second = encryptPhpCompatible(assetId.toString() + "second");
      const assetId_enc = encryptPhpCompatible(assetId.toString());
  
      const formattedDate = new Date().toLocaleDateString("es-CL", {  
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
              
      const secureCode = encryptPhpCompatible(formattedDate.toString() + "tsc-app");
      const param = {edit: edit, assetId_enc: assetId_enc, second: second, first: first}

      fetch(`https://tsc.sterlinginfotech.com/admin/clients/add_edit_asset_notes/`, {
      method: "POST", // 👈 same as axios.post
      credentials: "include", // 👈 this is like axios `withCredentials: true`
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer yourToken",
        "X-Requested-With": secureCode
      },
      body: JSON.stringify({ data: param }) // 👈 post body
    })
        .then((res) => res.json())
        .then((data) => {
          setNotes(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [show]);

  // Handle form changes
  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  // Submit API call
  const handleSubmit = () => {
    setLoading(true);
    fetch(`https://tsc.sterlinginfotech.com/admin/clients/add_edit_asset_notes/${assetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("User updated successfully!");
        setLoading(false);
        handleClose(); // Close modal after update
      })
      .catch(() => setLoading(false));
  };

  return (
    <ModalComponent
      show={show}
      handleClose={handleClose}
      title="Edit Notes"
      footer={
        <>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </>
      }
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form>
          <div className="mb-3">
            <label className="form-label">Notes</label>
            <textarea name="name" className="form-control" onChange={handleChange}></textarea>
          </div>
        </form>
      )}
    </ModalComponent>
  );
};
export default AddEditAssetNotes;
