import { createDoc, getCollections } from "firebase/firebase";
import React from "react";
import { Listbox } from '@headlessui/react';


import { useAuth } from "context/AuthProvider";
import AlertPopper from "components/Alerts/AlertPopper";
import { useHistory } from "react-router-dom";

// components
const STATE_INITIAL = {
  username: '',
  password: '',
  esAdmin: false,
  negocio: ''
}

export default function CardRegisterUser() {
  const { signUp } = useAuth();
  const navigate = useHistory();
  const [checked, setChecked] = React.useState(false);

  const [user, setUser] = React.useState(STATE_INITIAL)
  const [negocios, setNegocios] = React.useState([{
    codigo: 0,
    nombre: 'Negocio'
  }])
  const [selectedNegocio, setSelectNegocio] = React.useState(negocios[0])
  const [errorOrOk, setErrorOrOk] = React.useState("");

  const handleChange = (evt) => {
    setUser({
      ...user,
      [evt.target.name]: evt.target.value
    })
  }

  const handleCheckboxChange = () => {
    setChecked(!checked);
  }

  const getNegocio = async () => {
    const values = [];
    const response = await getCollections("negocios");
    response.forEach((value) => {
      values.push(value.data())
    })
    setNegocios(values);
    setErrorOrOk("")
  }

  function getUsers() {
    if (negocios.length > 0) {
      return (
        <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
          <Listbox value={selectedNegocio} onChange={setSelectNegocio}>
            <Listbox.Button>{selectedNegocio.nombre}</Listbox.Button>
            <Listbox.Options>
              {negocios.map((option) => (
                <Listbox.Option
                  key={option.codigo}
                  value={option}
                  className="w-full"
                >
                  {option.nombre}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      )
    }
  }

  React.useEffect(() => {
    getNegocio()
  }, [])

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    user.negocio = selectedNegocio.codigo
    user.esAdmin = checked
    setErrorOrOk("");
    if (user.username !== '' && user.password !== '' && user.esAdmin !== '' && user.negocio !== '') {
      try {
        const username = user.username.toLowerCase().trim().concat('@gmail.com');
        const { user: { uid } } = await signUp(username, user.password);
        if (uid && uid.length > 0) {
          const {
            username,
            esAdmin
          } = user;
          const negocio = selectedNegocio;
          const id = uid;
          const response = await createDoc("usuarios", {
            username,
            esAdmin,
            id,
            negocio
          });
          if (response && response.id.length > 0) {
            setUser(STATE_INITIAL);
            setErrorOrOk("Usuario creado");
            navigate.push('/admin/users/')
          }
        }
      } catch (error) {
        setErrorOrOk("Error al crear usuario")
      }

    }
  }


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          {errorOrOk && <AlertPopper color="red" message={errorOrOk} />}
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Usuario</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Informaci&oacute;n de usuario
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Usuario
                  </label>
                  <input
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Contraseña
                  </label>
                  <input
                    name="password"
                    value={user.password}
                    type="password"
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Permisos
            </h6>
            <div className="flex flex-wrap">
              <div className="w-2/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Es administrador
                  </label>
                  <input
                    name="esAdmin"
                    checked={checked}
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-8/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Negocio
                  </label>
                  {getUsers()}
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <button
              className="bg-lightBlue-500 mt-6 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
