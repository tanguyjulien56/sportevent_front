interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
}

export default function Card({
  title,
  description,
  imageUrl,
  onClick,
}: CardProps) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img className="w-full h-60 object-cover" src={imageUrl} alt="Event" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={onClick}>
            Voir
          </button>
        </div>
      </div>
    </div>
  );
}
