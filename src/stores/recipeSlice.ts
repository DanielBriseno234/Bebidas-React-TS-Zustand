import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/recipeService"
import { Categories, Drink, Drinks, Recipe, SearchFilters } from "../types"
import { FavoriteSliceType } from "./favoriteSlice"

export type RecipeSliceType = {
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategories: () => Promise<void>
    fetchRecipes: (filters : SearchFilters) => Promise<void>
    selectRecipe: ( id: Drink['idDrink'] ) => Promise<void>
    closeModal: () => void
}

export const createRecipeSlice : StateCreator<RecipeSliceType & FavoriteSliceType, [], [], RecipeSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        const response = await getCategories()
        set({
            categories: response
        })
    },
    fetchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})