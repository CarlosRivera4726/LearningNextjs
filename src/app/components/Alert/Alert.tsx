import { Status } from "@/app/enums/Status.enum";

interface AlertProps {
    message: string;
    status: Status;
    visible?: boolean;
}

export default function Alert({ message, status, visible = true }: AlertProps) {
    const statusColorText = {
        [Status.success]: "text-green-700",
        [Status.error]: "text-red-500",
        [Status.warning]: "text-yellow-700"
    }

    const statusColorBorder = {
        [Status.success]: "bg-green-500/15 border-green-500 rounded-sm",
        [Status.error]: "bg-red-500/15 border-red-500 rounded-sm",
        [Status.warning]: "bg-yellow-500/15 border-yellow-500 rounded-sm"
    }
    return (
        <div className={`flex items-center gap-2 border p-2 ${statusColorBorder[status]}`} style={{ display: visible ? "flex" : "none" }}>
            <h1 className={statusColorText[status]}>{message}</h1>
        </div>
    )
}