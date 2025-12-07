"use client"

import Alert from "@/app/components/Alert/Alert";
import Form from "@/app/components/Form/Form";
import Input from "@/app/components/Input/Input";
import { Status } from "@/app/enums/Status.enum";
import { useForm, SubmitHandler } from "react-hook-form"


type Inputs = {
    email: string;
    password: string;
}


export default function LoginPage() {
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<Inputs>();


    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    // console.info(watch("email"))


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold text-black">Login</h1>
            <div className="flex flex-col gap-4">
                {errors.email && <Alert message="El campo correo es requerido" status={Status.error} />}
                <Input register={register} name="email" type="email" />
                {errors.password && <Alert message="El campo contraseña es requerido" status={Status.error} />}
                <Input register={register} name="password" type="password" />
            </div>

            <input type="submit" className="bg-blue-500 text-white p-2 rounded mt-auto" />
        </Form>
    );
}