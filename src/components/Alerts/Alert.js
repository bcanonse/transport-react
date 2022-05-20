const Alert = ({ message, handleClick }) => {

    return (

        <div className="flex flex-row w-full rounded relative bg-red-200 border text-red-700 border-red-400  text-center" >
            <div
                className=" w-3/4 px-4 py-3  mb-2"
                role="alert"
            >
                <span className="sm:inline block">{message}</span>
            </div>
            <div
                className="w-1/4 px-4 py-3 mb-2"
            >
                <button 
                    type="button"
                    onClick={handleClick}
                    className="ml-auto -mx-1.5 -my-1.5  rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300" data-dismiss-target="#alert-1" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
                </button>
            </div>

        </div>
    );
}

export default Alert;