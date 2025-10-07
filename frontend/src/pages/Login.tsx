import React, { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
    //states
    const [formData, setFormData] = useState({ email: "", password: "" });

    //comportements
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);
        try {

            const response = fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response) {
                throw new Error("Erreur réseau");
            }

            const data = (await response).json();
            console.log("Succès", data);


            console.log("Succès :", data);
            // Redirection après inscription réussie
            window.location.href = "/Dashboard";


        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            alert("une erreur est survenue, veuillez réessayer ")

        }
    };

    return (
        <div className=" border-b border-gray-900/10 pb-12 dark:border-white/10 w-[100%] mx-auto mt-30">
            <div className=" bg-amber-50 shadow rounded-xl p-10 transition mx-auto max-w-2xl lg:mx-0 w-100">
                <h2 className="text-base/7 font-semibold text-gray-900 ">Connexion</h2>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    className="block w-80  rounded-md  px-3 py-1.5  text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6 dark:bg-white/5 dark:placeholder:text-gray-500 dark:focus:outline-green-700"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="text"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="password"
                                    className="block w-80 rounded-md  px-3 py-1.5  text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6 dark:bg-white/5  dark:placeholder:text-gray-500 dark:focus:outline-green-700"
                                />
                            </div>
                        </div>
                    </div>
                    <button className="bg-teal-700 p-2 mt-5 rounded-sm text-amber-50">se connecter</button>
                </form>
                <div className="flex justify-center mt-[-30px]">
                    <div className="hover:text-green-500 duration-150 cursor-pointer ml-45">
                        <Link to="/">Créer un compte ?</Link>
                    </div>
                </div>
            </div>
        </div>

    )

}
export default Login 