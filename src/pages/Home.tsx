import React from 'react'
import { Outlet, Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
        The Contents within this body will be dyanmic. The first page will be for description and when user navigates it will be in the
        playground section
        <Link to="/playground">Playground</Link>
    </div>
  )
}
