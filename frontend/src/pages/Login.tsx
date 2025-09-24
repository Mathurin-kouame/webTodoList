import { Link } from "react-router-dom"

export const Login = () => {
    return (

        <div className="space-y-12  w-[40%] mx-auto">
            <div className=" border-b mt-30 rounded-md">
                <h2 className="text-base/7 font-bold ">Connexion</h2>

                <form>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mx-auto">
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white/5  pl-3 outline-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        placeholder="votre mail"
                                        className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">

                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                    <input
                                        id="password"
                                        name="password"
                                        type="text"
                                        placeholder="votre mot de passe"
                                        className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="bg-teal-700 p-2 mt-5 rounded-sm text-amber-50">se connecter</button>
                </form>
                <div className="flex justify-center mt-10">
                    <Link to="/register">
                        <button>Créer un nouveau compte</button>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Login