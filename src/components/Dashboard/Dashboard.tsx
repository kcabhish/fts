import React from 'react'
import './dashboard.scss';
import { Outlet, Link } from "react-router-dom";
export interface IDashboard {
    title?: string;
}
export default function Dashboard(props: IDashboard) {
  return (
    <div className='dashboard-main-container'>
      <div className='dashboard-header-container'>
        <h1>{props.title}</h1>
        <div className='dashboard-nav'>
          <Link to="/">Home</Link>
          <Link to="/playground">Playground</Link>
        </div>
      </div>
      <div className='dashboard-body-container'>
        <Outlet />
      </div>
      <div className='dashboard-footer-container'>
      No © 2023 for FTS!, Inc., This is a prototype and I just needed to add some fillers for the footers.
      </div>
    </div>
  )
}
