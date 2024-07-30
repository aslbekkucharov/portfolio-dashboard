import { Outlet } from "react-router-dom"

type Props = {}

function Content(props: Props) {
    return (
        <div className="container px-5 py-7">
            <Outlet></Outlet>
        </div>
    )
}

export default Content