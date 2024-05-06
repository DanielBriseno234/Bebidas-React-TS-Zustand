import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })
    const {pathname} = useLocation()
    const isHome = useMemo( () => pathname === '/' , [pathname] )
    
    const fetchCategories = useAppStore( store => store.fetchCategories )
    const categories = useAppStore( store => store.categories )
    const fetchRecipes = useAppStore( store => store.fetchRecipes )
    const showNotification = useAppStore( store => store.showNotification )

    useEffect( () => {
        fetchCategories()
    }, [] )

    const handleChange = ( e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = ( e : FormEvent<HTMLFormElement> ) => {
        e.preventDefault()

        if( Object.values(searchFilters).includes('') ){
            showNotification( { text: 'Todos los campos son obligatorios', error: true } )
            return
        }

        fetchRecipes(searchFilters)
    }

    return (
        <header className={ isHome ? 'bg-header bg-cover bg-center' : 'bg-slate-800' }>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32" src="/logo.svg" alt="Logotipo" />
                </div>
                <nav
                    className="flex gap-5"
                >
                    <NavLink 
                        to="/" 
                        className={ ( {isActive} ) => 
                        isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold' }
                    >Index</NavLink>
                    <NavLink 
                        to="/favoritos" 
                        className={ ( {isActive} ) => 
                            isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold' }
                    >Favoritos</NavLink>
                </nav>
            </div>

            { isHome && (
                <form
                    className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-4">
                        <label 
                            htmlFor="ingredient"
                            className="block text-white uppercase font-extrabold text-lg"    
                        >Nombre o Ingredientes</label>
                    
                        <input 
                            id="ingredient"
                            name="ingredient"
                            type="text"
                            className="p-3 w-full rounded-lg focus:outline-none"
                            placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Cáfe"
                            onChange={handleChange}
                            value={searchFilters.ingredient}
                        />
                    </div>

                    <div className="space-y-4">
                        <label 
                            htmlFor="category"
                            className="block text-white uppercase font-extrabold text-lg"    
                        >Categoría</label>
                    
                        <select 
                            id="category"
                            name="category"
                            className="p-3 w-full rounded-lg focus:outline-none"
                            onChange={handleChange}
                            value={searchFilters.category}
                        >
                            <option value="">-- Selecciona --</option>
                            { categories.drinks.map( cat => (
                                <option 
                                    value={cat.strCategory}
                                    key={cat.strCategory}
                                >
                                    {cat.strCategory}</option>
                            ) ) }
                        </select>
                    </div>

                    <input 
                        type="submit" 
                        className="font-extrabold text-white uppercase bg-orange-700 hover:bg-orange-800 p-2 w-full rounded-lg cursor-pointer"
                        value="Buscar Receta"
                    />
                </form>
            )}

        </div>
        </header>
    )
}
