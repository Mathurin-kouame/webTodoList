 const Project = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Exemple de projet */}
                <div className="bg-white shadow w-130 h-100 rounded-xl p-4 transition">
                    <h2 className="text-xl font-semibold">Nouveau projet</h2>
                    <form action="">
                        <label htmlFor="title">
                            Titre:
                            <input type="text" className="block w-120 rounded-md  px-3 py-1.5  text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6 dark:bg-white/5  dark:placeholder:text-gray-500 dark:focus:outline-green-700"
/>
                        </label>
                       <label> <br />
                            Description:
                            <textarea name="content"
                                rows={4}
                                cols={40}
                                className="block w-120 rounded-md  px-3 py-1.5  text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6 dark:bg-white/5  dark:placeholder:text-gray-500 dark:focus:outline-green-700"
                            />
                      </label>
                        <button className="bg-teal-700 p-2 mt-5 hover:bg-teal-600 rounded-sm text-amber-50">Créer</button>
                    </form>
                </div>
                {/* Ajouter d'autres projets ici */}
            </div>
        </div>
    );
 }
export default Project;