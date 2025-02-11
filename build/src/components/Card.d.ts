import React from "react";
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
declare const Card: React.FC<CardProps>;
export default Card;
