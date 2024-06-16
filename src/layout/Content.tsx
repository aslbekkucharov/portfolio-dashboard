import { routes } from "../routes"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"

export default function Content() {

    return (
        <main className="wrapper mx-auto ">
            <Outlet />
        </main>
    )
}