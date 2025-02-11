import React from "react";
import HandleRegisterButton from "./handleRegisterButton";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
  eventId: string | null;
  userId: string;
  isUserRegistered: boolean;
  location: string;
  onStatusChange: (status: boolean) => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  onClick,
  eventId,
  userId,
  isUserRegistered,
  location,
  onStatusChange,
}) => {
  return (
    <div className="card bg-base-100 w-full max-w-md shadow-xl">
      <figure>
        <img className="w-full h-60 object-cover" src={imageUrl} alt="Event" />
      </figure>

      <div className="card-body">
        <div className="badge badge-ghost p-1 ">{location}</div>
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions grid grid-cols-2 items-center">
          <button className="btn btn-primary" onClick={onClick}>
            Voir plus
          </button>
          {/* Le bouton d'inscription/désinscription */}
          <HandleRegisterButton
            eventIdProps={eventId}
            userId={userId}
            isUserRegistered={isUserRegistered}
            onStatusChange={onStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
