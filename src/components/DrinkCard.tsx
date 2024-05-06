import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"

type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard( { drink } : DrinkCardProps ) {

    const selectRecipe = useAppStore( state => state.selectRecipe )

  return (
    <div className="border shadow-lg">
        <div className="overflow-hidden">
            <img 
                src={drink.strDrinkThumb}
                alt={`Imagen de ${drink.strDrink}`}
                className="hover:scale-125 transition-transform hover:rotate-2"
            />
        </div>
        <div className="p-5">
            <p className="text-2xl truncate font-black">{drink.strDrink}</p> 
            <button
                type="button"
                className="bg-orange-400 hover:bg-orange-500 text-lg font-bold p-3 w-full text-white text-center mt-3"
                onClick={() => selectRecipe(drink.idDrink)}
            >
                Ver Receta
            </button>
        </div>

    </div>
  )
}
