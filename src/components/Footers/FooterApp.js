const FooterApp = () => {
    return (
        <>
            <footer className="block py-4">
                <div className="container mx-auto px-4">
                    <hr className="mb-4 border-b-1 border-blueGray-200" />
                    <div className="flex flex-wrap items-center justify-center">
                        <div className="w-full md:w-4/12 px-4">
                            <div className="text-sm text-blueGray-500 font-semibold py-1 text-center">
                                Copyright © {new Date().getFullYear()} Transport Corporation
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default FooterApp;