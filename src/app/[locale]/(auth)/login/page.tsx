"use client"

import Alert from "@/app/components/Alert/Alert";
import Button from "@/app/components/Button/Button";
import Form from "@/app/components/Form/Form";
import Input from "@/app/components/Input/Input";
import { Status } from "@/app/enums/Status.enum";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form"


type Inputs = {
    email: string;
    password: string;
}


export default function LoginPage() {
    const t = useTranslations("common");
    const t_form = useTranslations("form");
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
            <h1 className="text-2xl font-bold text-black dark:text-white">{t("login")}</h1>
            <div className="flex flex-col gap-4">
                {errors.email && <Alert message={t_form("alerts.namerequired")} status={Status.error} />}
                <Input register={register} name="email" type="email" label={t_form("common.email")} />
                {errors.password && <Alert message={t_form("alerts.passwordrequired")} status={Status.error} />}
                <Input register={register} name="password" type="password" label={t_form("common.password")} />
            </div>

            <Button fullWidth type="submit" color="primary" value={t_form("login.title")} />
        </Form>
    );
}