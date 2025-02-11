interface EmailRequest {
    email: string;
}
export declare function sendEmail(body: EmailRequest): Promise<any>;
export {};
