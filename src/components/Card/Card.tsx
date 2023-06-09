import React from 'react';
import { Link } from "react-router-dom";
import './card.scss';
interface ICard {
    cardTitle: string;
    navigationLink?: string;
}
export default function Card(props: ICard) {
  if (!props.navigationLink) {
    return <DefaultCard {...props} />
  }
  return <NavigationCard {...props} />
}

function DefaultCard(props: ICard) {
  return (
    <>
      <div className='card-main-container'>
        <h3>{props.cardTitle}</h3>
      </div>
    </>
  )
}

function NavigationCard(props: ICard) {
  return (
    <>
      <Link to={`${props.navigationLink}`}><DefaultCard cardTitle={props.navigationLink || 'No Title'} /></Link>
    </>
  )
}