import { FormattedEventCardInterface } from "../../services/interfaces/event";
interface MapComponentProps {
    events: FormattedEventCardInterface[];
    selectedEvent: FormattedEventCardInterface | null;
    setSelectedEvent: (event: FormattedEventCardInterface | null) => void;
}
export default function MapComponent({ events, selectedEvent, setSelectedEvent, }: MapComponentProps): import("react/jsx-runtime").JSX.Element;
export {};
