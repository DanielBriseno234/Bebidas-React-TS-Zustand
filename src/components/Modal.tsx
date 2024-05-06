import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

export default function Modal() {

    const modal = useAppStore( store => store.modal )
    const closeModal = useAppStore( store => store.closeModal )
    const selectedRecipe = useAppStore( store => store.selectedRecipe )
    const handleClickFavorite = useAppStore( store => store.handleClickFavorite )
    const favoriteExist = useAppStore( store => store.favoriteExist )

    const renderIngredients = () => {
        const ingredients : JSX.Element[] = []

        for(let i = 1; i <= 10; i++){
            const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]
            const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]
        
            if(ingredient && measure){
                ingredients.push(
                    <li key={i}>
                        {ingredient} - {measure}
                    </li>
                )
            }
        }

        return ingredients
    }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                      { selectedRecipe.strDrink }
                  </Dialog.Title>
                  <img 
                    src={selectedRecipe.strDrinkThumb} 
                    alt={`Imagen de ${selectedRecipe.strDrinkThumb}`}
                    className='mx-auto w-96' 
                  />
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Ingredientes y Cantidades
                  </Dialog.Title>

                  { renderIngredients() }
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Instrucciones
                  </Dialog.Title>
                  <p
                    className='text-lg'>{selectedRecipe.strInstructions}</p>

                  <div className='mt-5 flex justify-between gap-5'>
                    <button
                        className='bg-gray-400 hover:bg-gray-500 p-3 font-bold uppercase rounded-lg w-full text-white'
                        onClick={closeModal}
                    >
                    Cerrar</button>
                    <button
                        className='bg-orange-400 hover:bg-orange-500 p-3 font-bold uppercase rounded-lg w-full text-white'
                        onClick={() => handleClickFavorite(selectedRecipe)}
                    >
                    {  favoriteExist(selectedRecipe.idDrink) ? 'Eliminar Favorito' : 'Agregar a Favoritos'}</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}