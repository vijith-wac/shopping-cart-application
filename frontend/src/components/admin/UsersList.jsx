import { useEffect, useState } from "react";
import { allUser } from "../../services/user";
import { Link } from "react-router-dom";
import ModalReact from "../ModalReact";

const UsersList = () => {
  const [usersList, setUsersList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ name: '', email: '' });

  const getAllUsers = async () => {
    try {
      const res = await allUser();
      setUsersList(res.users);
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = (user) => {

    setSelectedUser(user);
    setModalShow(true);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container">
      <h2>Users List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList?.map((user) => {
            const { _id, name, email } = user;
            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                  <Link className="btn btn-primary me-5" onClick={() => editHandler({ _id, name, email })}>Edit</Link>
                  <Link className="btn btn-danger">Delete</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ModalReact
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersList;
