"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiUrl } from "@/configs/config";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {

    const [formValue, setFormValue] = useState({ username: "", password: "" })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = apiUrl + "auth/login";

        setIsLoading(true)


        try {
            const res = await axios.post(url, formValue)

            sessionStorage.setItem("session", res.data.token)
            router.push("/fa/dashboard")



        } catch (error) {
            console.log(error);

        }
        setIsLoading(false)
    }
    return (
        <div className="flex items-center justify-center h-dvh ">
            <form onSubmit={handleLogin} className="flex flex-col gap-6 bg-white px-12 py-6 rounded-xl border shadow">
                <div className="flex justify-center">
                    <Image src="/logo web.png" alt="" className='w-18 md:w-24 ' width={200} height={200} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>نام کاریری *</Label>
                    <Input value={formValue.username}
                        onChange={(e) =>
                            setFormValue(prev => ({
                                ...prev,
                                username: e.target.value
                            }))
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>رمز عبور *</Label>
                    <Input value={formValue.password}
                        onChange={(e) =>
                            setFormValue(prev => ({
                                ...prev,
                                password: e.target.value
                            }))
                        }
                    />

                </div>
                <Button

                    type="submit"
                    size="lg"
                    className="col-span-2 mt-2"

                >
                    {isLoading ? "در حال ورود" : "  ورود"}

                </Button>


            </form>
        </div>
    )
};

export default LoginPage;
