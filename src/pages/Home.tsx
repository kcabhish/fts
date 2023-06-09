import React from 'react'
import { Outlet, Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
        <p>This is prototype for translating language during run time. Behind the back it utilizes Amazon translate service. When user types in the message in their selected language and sends the message,
        the inbound message on the other end will be translated to the language preference set on the widget.
        </p>
        <p>  
        Use the navigation option from the top right to browse through the page.
        </p>
    </div>
  )
}
