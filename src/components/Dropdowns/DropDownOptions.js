import { Listbox } from '@headlessui/react'

export default function DropDownOptions({ options, selectedPerson, setSelectedPerson }) {
    return (
        <>
            <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                <Listbox value={selectedPerson} onChange={setSelectedPerson}>
                    <Listbox.Button>{selectedPerson.name}</Listbox.Button>
                    <Listbox.Options>
                        {options.map((option, index) => (
                            <Listbox.Option
                                key={index}
                                value={option}
                                className="w-full"
                            >
                                {option.name}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Listbox>
            </div>
        </>

    )
}