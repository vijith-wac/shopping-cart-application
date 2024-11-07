import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { updateProductById } from "../../services/admin/product";

const AdminProductList = ({ product }) => {
  const token = localStorage.getItem('authToken');
  const { _id, image, name, price, description, category, stockQuantity } = product;

  const [modalShow, setModalShow] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editPrice, setEditPrice] = useState(price);
  const [editDescription, setEditDescription] = useState(description);
  const [editCategory, setEditCategory] = useState(category);
  const [editStockQuantity, setEditStockQuantity] = useState(stockQuantity);
  const [editImage, setEditImage] = useState(image); // Store image or URL
  const [imagePreview, setImagePreview] = useState(image); // For previewing the new image

  const editHandler = () => {
    setEditName(name);
    setEditPrice(price);
    setEditDescription(description);
    setEditCategory(category);
    setEditStockQuantity(stockQuantity);
    setEditImage(image); // Set the current image for the modal
    setImagePreview(image); // Set the image preview URL
    setModalShow(true);
  };

  const handleClose = () => setModalShow(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImage(file); // Store the file for uploading
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the file
    }
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("price", editPrice);
      formData.append("description", editDescription);
      formData.append("category", editCategory);
      formData.append("stockQuantity", editStockQuantity);

      // Only append the image if it's a new file
      if (editImage instanceof File) {
        formData.append("image", editImage);
      } else {
        formData.append("image", editImage); // Use the existing image if no new file
      }

      // Perform the API request to update the product
      const res = await updateProductById(token, _id, formData);
      console.log("Product updated successfully:", res);
      setModalShow(false); // Close the modal after saving
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p>{stockQuantity}</p>
        <button onClick={editHandler} className="btn btn-primary">
          Edit
        </button>
        <button className="btn btn-danger">Delete</button>
      </div>

      {/* Edit Modal */}
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              value={editStockQuantity}
              onChange={(e) => setEditStockQuantity(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="form-control"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ maxWidth: '100px' }}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminProductList;
