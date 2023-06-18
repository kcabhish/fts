import { Link } from 'react-router-dom';
import './card.scss';

interface ICard {
  cardTitle: string;
  navigationLink?: string;
}

export default function Card(props: ICard) {
  const { cardTitle, navigationLink } = props;

  if (!navigationLink) {
    return (
      <div className="card-main-container">
        <h3>{cardTitle}</h3>
      </div>
    );
  }

  return (
    <Link to={navigationLink}>
      <div className="card-main-container">
        <h3>{navigationLink}</h3>
      </div>
    </Link>
  );
}
