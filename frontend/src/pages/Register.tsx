import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {

    const [formData, setFormData] = useState({
        nom: "",
        prenoms: "",
        email: "",
        password: ""
    });

    // Gérer la saisie des inputs
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    //Gére la soumission du formulaire
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Données envoyées :", formData);
 
        fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur réseau");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Succès :", data);
                // Redirection après inscription réussie
                window.location.href = "/login";
            })
            .catch((error) => {
                console.error("Erreur lors de l’inscription :", error);
            });
    };

    return (

        <div className="border-b border-gray-900/10 pb-12 dark:border-white/10 w-[50%] mx-auto mt-30">
            <h2 className="text-base/7 font-semibold text-gray-900 ">Inscription</h2>

            <form onSubmit={handleSubmit}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                            Nom
                        </label>
                        <div className="mt-2">
                            <input
                                id="nom"
                                name="nom"
                                type="text"
                                value={formData.nom}
                                onChange={handleChange}
                                className="block w-120  rounded-md  px-3 py-1.5  text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6 dark:bg-white/5  dark:placeholder:text-gray-500 dark:focus:outline-green-700"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                            Prénoms
                        </label>
                        <div className="mt-2">
                            <input
                                id="prenoms"
                                name="prenoms"
                                type="text"
                                value={formData.prenoms}
                                onChange={handleChange}
                                autoComplete="family-name"
                                className="block w-120 rounded-md px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6 dark:bg-white/5 dark:placeholder:text-gray-500 dark:focus:outline-green-700"
                            />
                        </div>
                    </div>
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
                                className="block w-120  rounded-md  px-3 py-1.5  text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6 dark:bg-white/5 dark:placeholder:text-gray-500 dark:focus:outline-green-700"
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
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="password"
                                className="block w-120 rounded-md  px-3 py-1.5  text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6 dark:bg-white/5  dark:placeholder:text-gray-500 dark:focus:outline-green-700"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="bg-teal-700 p-2 mt-5 rounded-sm text-amber-50">
                    S'inscrire
                </button>
            </form>

            <div className="flex justify-center mt-[-30px]">
                <div className=" hover:text-green-500 duration-150 cursor-pointer">
                    <Link to="/">déjà un compte ?</Link>
                </div>
            </div>
        </div>

    )
}

export default Register