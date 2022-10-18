import React from "react";
import axios from "axios";
import { debounce } from "lodash";

export default function Contacts(props) {
  const apiUrl = "http://localhost:8081";

  const deleteItem = (item) => {
    axios.delete(`${apiUrl}/contact/deleteContact/${item._id}`).then((res) => {
      props.getContacts();
    });
  };
//   const editItem = (item) => {
//     props.editContact(item);
//   };
  const handleSearch = debounce((e) => {
    props.searchContact(e.target.value.toLowerCase());
  }, 1000);
  return (
    <div className="container">
      <input type="text" onChange={handleSearch} placeholder="Search by name" class="txt" style={{width:'70%', marginBottom:'20px'}}/>
      <table style={{ width: "100%" }} class="table table-striped">
        <thead>
          <th> Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Action</th>
        </thead>
        <tbody>
          {props.contacts?.map((item) => {
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contactNumber}</td>
                <td>
                  {/* <button onClick={()=>editItem(item)}>Edit</button>&nbsp; */}
                  {/* <button onClick={()=>deleteItem(item)}>Delete</button> */}
                  {/* <td><p data-placement="top" data-toggle="tooltip" title="Edit">
                                <button onClick={()=>editItem(item)} class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p>
                                </td> */}
                  <td>
                    <p
                      data-placement="top"
                      data-toggle="tooltip"
                      title="Delete"
                    >
                      <button
                        onClick={() => deleteItem(item)}
                        class="btn btn-danger btn-xs"
                        data-title="Delete"
                        data-toggle="modal"
                        data-target="#delete"
                      >
                        <span class="glyphicon glyphicon-trash"></span>
                      </button>
                    </p>
                  </td>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
