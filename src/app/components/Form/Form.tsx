/* eslint-disable @typescript-eslint/no-explicit-any */

interface FormProps {
    children: React.ReactNode;
    onSubmit: (data: any) => void;
}

export default function Form({ children, onSubmit }: FormProps) {
    return (
        <div className="flex items-center justify-center min-h-screen w-full text-black">
            <form className="flex flex-col gap-10 bg-white p-6 w-96 rounded" onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    );
}