/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Alert from "@/app/components/Alert/Alert";
import Button from "@/app/components/Button/Button";
import Form from "@/app/components/Form/Form";
import Input from "@/app/components/Input/Input";
import { Status } from "@/app/enums/Status.enum";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useState } from "react";
// import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export default function RegisterPage() {
    const t = useTranslations("common");
    const t_form = useTranslations("form");
    const [alert, setAlert] = useState({ message: "", status: Status.success })
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<Inputs>();


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.post("/api/auth/register", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data)
            if (response.data.status !== 201) {
                setAlert({ message: response.data.message, status: Status.error })
            } else {
                setAlert({ message: response.data.message, status: Status.success })
            }
        } catch (error: any) {
            console.log(error)
            setAlert({ message: error.response.data.message, status: Status.error })
        }

    }

    // console.info(watch("email"))

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold text-black dark:text-white">{t("register")}</h1>
            {alert.message && <Alert message={alert.message} status={alert.status} />}
            <div className="flex flex-col gap-4">
                {errors.name && <Alert message={t_form("alerts.namerequired")} status={Status.error} />}
                <Input register={register} name="name" type="text" label={t_form("common.name")} />
                {errors.email && <Alert message={t_form("alerts.emailrequired")} status={Status.error} />}
                <Input register={register} name="email" type="email" label={t_form("common.email")} />
                {errors.password && <Alert message={t_form("alerts.passwordrequired")} status={Status.error} />}
                <Input register={register} name="password" type="password" label={t_form("common.password")} />
                {errors.confirmPassword && <Alert message={t_form("alerts.confirmPasswordrequired")} status={Status.error} />}
                <Input register={register} name="confirmPassword" type="password" label={t_form("register.confirmPassword")} />
            </div>

            <Button type="submit" color="primary" value={t_form("register.title")} />


        </Form>
    );
}