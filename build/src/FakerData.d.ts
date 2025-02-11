interface Event {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    imageUrl: string;
}
export declare const generateRealisticEvents: () => Event[];
export {};
