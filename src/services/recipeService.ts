import axios from "axios"
import { CategoriesApiResponseSchema, DrinksApiResponseSchema, RecipeAPIResponseSchema } from "../utils/recipes-schema"
import { Drink, SearchFilters } from "../types"

export async function getCategories(){
    const urlApi = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

    const { data } = await axios.get(urlApi)
    const response = CategoriesApiResponseSchema.safeParse(data)

    if(response.success){
        return response.data
    }
}

export async function getRecipes(filters : SearchFilters){
    const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const { data } = await axios.get(urlApi)
    const response = DrinksApiResponseSchema.safeParse(data)
    if (response.success) {
        return response.data
    }
}

export async function getRecipeById (id: Drink['idDrink']) {
    const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const { data } = await axios.get(urlApi)
    const response = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if( response.success ){
        return response.data
    }
}