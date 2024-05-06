import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { RecipeSliceType, createRecipeSlice } from "./recipeSlice"
import { FavoriteSliceType, createFavoriteSlice } from "./favoriteSlice"
import { NotificationSliceType, createNotificationSlice } from "./notficationSlice"

//Utilizamos un store principal y ´podemos crer slices que son como partes de este store
//de esta forma vamos integrando cada slice con este store
//para pasar los argumentos a esos slice le tenemos que pasar una copia de los argumentos
export const useAppStore = create<RecipeSliceType & FavoriteSliceType &NotificationSliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a)
})))