interface HandleRegisterButtonProps {
    eventIdProps: string | null;
    userId: string;
    isUserRegistered: boolean;
    onStatusChange: (status: boolean) => void;
}
declare const HandleRegisterButton: React.FC<HandleRegisterButtonProps>;
export default HandleRegisterButton;
