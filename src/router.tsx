import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
const IndexPage = lazy( () => import("./pages/IndexPage") )
const FavoritePage = lazy( () => import("./pages/FavoritePage") )

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={
                  <Suspense fallback="Cargando...">
                    <IndexPage />
                  </Suspense>
                } index />
                <Route path="/favoritos" element={
                  <Suspense fallback="Cargando...">
                    <FavoritePage />
                  </Suspense>
                } />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
