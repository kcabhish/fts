import React from 'react'
import './dashboard.scss';
export interface IDashboard {
    title?: string;
}
export default function Dashboard(props: IDashboard) {
  return (
    <div className='dashboard-main-container'>
      <div className='dashboard-header-container'>
        <h1>{props.title}</h1>
      </div>
      <div className='dashboard-body-container'>
        The Contents within this body will be dyanmic. The first page will be for description and when user navigates it will be in the playground section
      </div>
    </div>
  )
}
