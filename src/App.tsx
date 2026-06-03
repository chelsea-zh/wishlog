import { useState } from 'react'
import ToDo from './ToDo'
import Schedule from './Schedule';
import './App.css'

function Title() {
  return(
    <div className='title'>
      <h1>Wishlog</h1>
    </div>
  )
}

function Sidebar() {
  return(
    <div className='sidebar'>
      <h1>Sidebar</h1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Sidebar />
      <Title />
      <Schedule />
      <ToDo />
    </div>
  );
}

export default App
