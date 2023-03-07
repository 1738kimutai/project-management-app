import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import img2 from '../assets/hero-drone.webp';
import { PROJECTS } from '../assets/data';
import { useHistory } from 'react-router-dom';

const Home = ({ user, setUser, projects, setProjects }) => {
  // conditionally set the start button depending on whether the user is logged in
  const startBtn = user ? '#projects' : '/login';
  // state for the title and description of a new project
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // get access to the history object from react-router-dom
  const history = useHistory();

  // fetch the projects from the backend API when the component mounts
  useEffect(() => {
    fetch(`http://localhost:9292/projects`)
      .then((r) => r.json())
      .then((d) => setProjects(d));
  }, []);

  // handle deleting a project
  const handleDelete = (id, e) => {
    e.preventDefault();
    console.log(id);
    fetch(`http://localhost:9292/projects/${id}`, {
      method: 'DELETE',
      headers: { accept: 'application-json' },
    }).then(() => {
      // remove the deleted project from the projects state
      const filteredProjects = projects.filter((project) => project.id != id);
      setProjects(filteredProjects);
    });
  };

  // handle creating a new project
  const handleAddProject = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9292/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    }).then(() => {
      // clear the form and navigate to the projects page
      setTitle('');
      setDescription('');
      history.push('/projects');
    });
  }

  return (
    <>
      <div className='home-container' id='home'>
        <section className='home-text'>
          <h1>Let’s build from here🚀</h1>
          <p>
            Harnessed for productivity. Designed for collaboration. Celebrated
            for built-in security. Welcome to the platform developers love.
            Accelerate high-quality software development.
          </p>
          <br />
          <NavLink to={startBtn} >
            <button>Start Building</button>
          </NavLink>
        </section>
      </div>
      <img src={img2} alt="" id='floating-drone'/>
      <div className='projects-container' id='projects'>
        <h1>Your projects</h1>
        <div className='all-projects-container'>
          {/* map over the projects and display each one */}
          {projects ? (
            projects.map((project) => {
              return (
                <div
                  className='project'
                  key={project.id}
                >
                  <section>
                    <h2>{project.title}</h2>
                    <details>
                      <summary>Description</summary>
                      <p>{project.description}</p>
                    </details>
                  </section>
                  <div className='project-icons'>
                    <button className='btn btn-primary my-2'>Edit</button>
                    {/* call handleDelete when the delete button is clicked */}
                    <button className='btn btn-primary my-2' onClick={(e) => handleDelete(project.id, e)}>Delete</button>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>You dont have any projects</h2>
          )}
        </div>
      </div>
      {/* ============== */}
      <div className='add-project-container' id='add-project'>
        <form onSubmit={handleAddProject} className='project-form'>
          <h1>Start a new project</h1>
          <label>Project title</label>
          <input
            type='text'
            placeholder='Enter title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Project description</label>
          <textarea
            type='text'
            placeholder='Enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <br />
          <button type='submit'>Create Project</button>
        </form>
        <section className='add-project-img'>
          <img src={img2} alt='Develop app' />
        </section>
      </div>
    </>
  );
};

export default Home;
