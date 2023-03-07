import React from 'react'
import { NavLink } from 'react-router-dom';

const MenuBar = ({ user, setUser}) => {
  return (
    <div className='header'>
      <header>
        <section className='logo'>Project Manager</section>
        <nav>
          <NavLink to='/'>Home</NavLink>
          {user ? (
            <>
              <a href='#projects'>Projects</a>
              <a href='#add-project'>Add Project</a>
              <button
                onClick={() => {
                  setUser(false);
                  history.push('/');
                }}
              >
                <a href='#home'>Logout</a>
              </button>
            </>
          ) : (
            <button>
              <NavLink to='/login'>Login </NavLink>
            </button>
          )}
        </nav>
      </header>
    </div>
  );
}

export default MenuBar