import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsTrash3Fill, BsPlusCircleFill, BsFillCheckCircleFill, BsPencil } from "react-icons/bs";
import * as userClient from "../Clients/userClient";
import { Link } from "react-router-dom";

export default function UserTable() {
  const addIconStyle = { color: "green", fontSize: "2.5em" };
  interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    pdgaNum: string;
    role: string;
  }
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    pdgaNum: "",
    role: "USER",
  });

  const fetchUsers = async () => {
    const users = await userClient.findAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteTournament = async (user: User) => {
    try {
      await userClient.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const selectTournament = async (user: User) => {
    try {
      const u = await userClient.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };

  const createTournament = async () => {
    try {
      const newTournament = await userClient.createUser(user);
      console.log(newTournament);
      setUsers([newTournament, ...users]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTournament = async () => {
    try {
      const status = await userClient.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>User Editior</h1> <hr />
      <table className="table">
        <thead>
          <tr>
            <th>Username/Password</th>
            <th>Name</th>
            <th>Email/PDGA#</th>
            <th>Role</th>
            <th>&nbsp;</th>
          </tr>
          <tr>
            <td>
              <div className="row">
                <div className="col">
                  <input
                    className="form-control mb-1"
                    placeholder="Username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                  />
                  <input
                    className="form-control"
                    value={user.password}
                    placeholder="Password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                  />
                </div>
              </div>
            </td>
            <td>
              <div className="row">
                <div className="col">
                  <input
                    className="form-control mb-2"
                    value={user.firstName}
                    placeholder="First Name"
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  />
                  <input
                    className="form-control"
                    value={user.lastName}
                    placeholder="Last Name"
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  />
                </div>
              </div>
            </td>
            <td>
              <div className="row">
                <div className="col">
                  <input className="form-control mb-2" value={user.email} placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                  <input className="form-control" value={user.pdgaNum} placeholder="PDGA#" onChange={(e) => setUser({ ...user, pdgaNum: e.target.value })} />
                </div>
              </div>
            </td>
            <td>
              <div className="row">
                <div className="col">
                  <select className="form-control mb-2" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                    <option value="USER">User</option>
                    <option value="TD">Tournament Director</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                  <span className="float-end">
                    Edit
                    <BsFillCheckCircleFill onClick={updateTournament} className="ms-1 me-4 text-success fs-1 text" />
                    Add
                    <BsPlusCircleFill className="ms-1" style={addIconStyle} onClick={createTournament} />
                  </span>
                </div>
              </div>
            </td>
          </tr>
        </thead>
      </table>{" "}
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>PDGA#</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user?._id}>
              <td>
                <Link to={`/Profile/${user?._id}`}>{user?.username}</Link>
              </td>
              <td>
                {user?.firstName} {user?.lastName}
              </td>
              <td>{user?.email}</td>
              <td>{user?.pdgaNum}</td>
              <td>{user?.role}</td>

              <td>
                <button className=" btn btn-danger me-2" onClick={() => deleteTournament(user)}>
                  <BsTrash3Fill />
                </button>
                <button className="btn btn-warning me-2">
                  <BsPencil onClick={() => selectTournament(user)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
