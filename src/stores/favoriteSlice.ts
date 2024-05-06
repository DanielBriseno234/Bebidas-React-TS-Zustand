import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { RecipeSliceType, createRecipeSlice } from "./recipeSlice"
import { NotificationSliceType, createNotificationSlice } from "./notficationSlice"

export type FavoriteSliceType = {
    favorites: Recipe[]
    handleClickFavorite: ( recipe: Recipe ) => void
    favoriteExist: ( id: Recipe['idDrink'] ) => boolean
    loadFavorites: () => void
}

export const createFavoriteSlice : StateCreator<FavoriteSliceType & RecipeSliceType & NotificationSliceType, [], [], FavoriteSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favoriteExist(recipe.idDrink)){
            set( state=> ({
                favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink )
            }))
            createNotificationSlice(set, get, api).showNotification({ text: 'Se eliminó de favoritos', error: false })
        }else{
            set( state => ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({ text: 'Se agregó de favoritos', error: false })
        }
        createRecipeSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify( get().favorites ))
    },
    favoriteExist: (id) => {
        return get().favorites.some( favorite => favorite.idDrink === id )
    },
    loadFavorites: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    } 
})