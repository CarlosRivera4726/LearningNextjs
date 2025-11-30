/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from "react-hook-form";


interface InputProps {
    register: UseFormRegister<any>;
    name: string;
    type: string;
}

export default function Input({ register, name, type }: InputProps) {
    return (
        <div className="relative">
            <input
                type={type}
                id={name}
                className="peer block w-full border border-gray-300 rounded px-3 pt-5 pb-1 text-base placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder=" "
                {...register(name, { required: true })}
            />
            <label
                htmlFor={name}
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all duration-150 ease-out
                                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
                                  peer-focus:top-0.5 peer-focus:text-blue-600 peer-focus:text-sm peer-focus:translate-y-0"
            >
                {name}
            </label>
        </div>
    )
}