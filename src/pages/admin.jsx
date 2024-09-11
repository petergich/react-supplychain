import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import '../styles/App.css';
import Aside from '../components/Aside';
import apiService from '../service/apiService'; 
const Admin = () => {
  const [isNavVisible, setNavVisible] = useState(false);
  const [users, setUsers] = useState([]); // State to store the list of users

  const toggleNavbar = () => {
    setNavVisible(!isNavVisible);
  };

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiService.getAllUsers(); // Call the getAllUsers API
        console.log(response)
        setUsers(response.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
        alert(error.message);
      }
    };

    fetchUsers();  
  }, []);

  const handleStatusChange = async (id) => {
    try {
      await apiService.updateUserStatus(id); 
      window.location.reload()
    } catch (error) {
      console.error('Error updating status:', error);
      alert(error.message);
    }
  };
  const handleRemoveUser = (userId) => {
    
    apiService.deleteUser(userId)
      .then(response => {
        alert(`User removed successfully: ${response.data.username}`);
        
      })
      .catch(error => {
        alert(`Failed to remove user: ${error.message}`);
      });
  };

  return (
    <div className="dashboard-container">
      <Aside isNavVisible={isNavVisible} />
      <main className="main-content">
        <header className="main-header">
          <div className="d-flex">
            <button className="toggle-btn mr-2" onClick={toggleNavbar}>
              <i style={{ color: "aqua" }} className="fa-solid fa-bars"></i>
            </button>
            <h1 className="top-text"><i className="fas fa-user-shield"></i> Admin</h1>
          </div>
          <h1 className="top-text">Username</h1>
        </header>
        <div className="content">
          <section className="inventory-table">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th> Email status </th> 
                  <th>Role</th>
                  <th>Status</th>
                  <th>Remove user</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td> <i className="fas fa-user" style={{ marginRight: '8px' }}></i> {/* Product logo */}{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.accountApproved?'Verified':'Not verified'}</td>
                    <td>{user.role}</td>
                    <td>
                        
                    <div className="dropdown">
  <button
    className="btn btn-primary dropdown-toggle"
    type="button"
    id="dropdownMenuButton"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
  >
    {user.accountApproved ? 'Active' : 'Inactive'}
  </button>
  
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
  
    {user.accountApproved ? (
      <>
      
        <button
          className="btn btn-success dropdown-item"
          disabled
        >
          Activate
        </button>
        <button
          className="btn btn-warning dropdown-item"
          onClick={() => handleStatusChange(user.id)}  
        >
          Deactivate
        </button>
      </>
    ) : (
      <>
        <button
          className="btn btn-success dropdown-item"
          onClick={() => handleStatusChange(user.id)}  
        >
          Activate
        </button>
        <button
          className="btn btn-warning dropdown-item"
          disabled
        >
          Deactivate
        </button>
      </>
    )}
  </div>
</div>

                      </td>
                    <td>
                    <button className="delete_button" onClick={() => handleRemoveUser(user.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Admin;
