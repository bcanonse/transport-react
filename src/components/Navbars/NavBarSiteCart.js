import { Link } from "react-router-dom";

const NavbarSiteCart = ({ detail, handleClick }) => {
    return (
        <>
            <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between">
                        <Link
                            className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                            to="/"
                        >
                            Home
                        </Link>
                        <button
                            className="cursor-pointer text-xl leading-none px-3 py-1  bg-transparent block outline-none focus:outline-none"
                            type="button"
                            onClick={handleClick}
                        >

                            <svg className="flex-1 w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                            </svg>
                            <span className={
                                "absolute right-0 top-0 rounded-full bg-blueGray-200 text-blueGray-500 w-5 h-5 top right p-0 m-0 font-mono text-sm  leading-tight text-center " +
                                (detail.length !== 0 ? "" : "hidden")
                            }>
                                {detail.length}
                            </span>
                        </button>
                    </div>
                    <div
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

export default NavbarSiteCart;