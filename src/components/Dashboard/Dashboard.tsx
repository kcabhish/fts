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
        <Link to="/">Home</Link>
        <Link to="/playground">Playground</Link>
      </div>
      <div className='dashboard-body-container'>
        <Outlet />
      </div>
    </div>
  )
}
