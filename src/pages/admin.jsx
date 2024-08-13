import React, {useState  } from 'react';
import '../styles/home.css';
import '../styles/App.css';
import { Link } from 'react-router-dom'; 
import Aside from '../components/Aside';


const Admin = () => {
  
  const [isNavVisible, setNavVisible] = useState(true);
  const toggleNavbar = () => {
    setNavVisible(!isNavVisible);
};

  // Check token when the component mounts
  // useEffect(() => {
  //   apiService.checktoken(localStorage.getItem('token'))
  //     .then(response => {
  //       if (response.data.message !== 'valid') {
  //         navigate('/login');
  //       }
  //     })
  //     .catch(error => {
  //       navigate('/login');
  //       if (error.response) {
  //         alert(error.response.data.message);
  //       } else if (error.request) {
  //         alert('No response received from the server.');
  //       } else {
  //         alert(`Error: ${error.message}`);
  //       }
  //       console.error('Error checking token:', error);
  //     });
  // }, [navigate]);

  

  return (
    <div className="dashboard-container">
       <Aside
      isNavVisible={isNavVisible}
      />
      <main className="main-content">
      <header className="main-header">
          <div className='d-flex'>
          <button className="toggle-btn mr-2" onClick={toggleNavbar}>
          <i style={{color:"aqua"}}className="fa-solid fa-bars"></i>
          </button>
          <h1 className="top-text">  <i className="fas fa-user-shield">  </i>  Admin</h1>
          </div>
          <h1 className="top-text">Username</h1>

        </header>
        <div className='content'>

        <section className="inventory-table">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Verified</th>
                <th>Status</th>
                <th>Remove user</th>
                
              </tr>
            </thead>
            {/* <tbody>
              {inventory.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.category ? item.category.name : 'N/A'}</td>
                  <td>{item.quantity}<button className="update_button" onClick={toggleUpdatemodal}> Update </button></td>
                  <td>${item.price ? item.price.toFixed(2) : 'N/A'}</td>
                  <td>
                    <button className='edit_button' onClick={toggleEditModal}>Edit</button>
                    <button className="delete_button" onClick={() => deleteInventoryItem(item.id)}> Delete </button>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </section>
        </div>
      </main>
     </div> 
  );
};

export default Admin;
