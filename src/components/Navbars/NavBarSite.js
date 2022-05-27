import { Link } from "react-router-dom";

const NavbarSite = () => {
    return (
        <>
            <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
                <div className="container px-4 mx-auto items-center justify-between">
                    <div className="w-full relative flex flex-row justify-between">
                        <div className="w-4/5">
                            <Link
                                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                                to="/"
                            >
                                Home
                            </Link>
                        </div>
                        <div className="w-1/5 flex flex-row">
                            <div className="w-1/2 text-center">
                                <Link
                                    className="cursor-pointer text-xl leading-none px-3 py-1 rounded bg-transparent block outline-none focus:outline-none"
                                    to="/status-order"
                                >
                                    <i className="text-white fas fa-receipt"></i>
                                </Link>
                            </div>

                            <div className="w-1/2 text-center">
                                <Link
                                    className="cursor-pointer text-xl leading-none px-3 py-1 rounded bg-transparent block outline-none focus:outline-none"
                                    to="/auth/login"
                                >
                                    <i className="text-white fas fa-house-user"></i>
                                </Link>
                            </div>


                        </div>
                    </div>
                    <div
                        /* className={
                            "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
                            (navbarOpen ? " block rounded shadow-lg" : " hidden")
                        } */
                        id="example-navbar-warning"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="flex items-center">
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavbarSite;