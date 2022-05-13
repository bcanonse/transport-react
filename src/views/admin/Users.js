import React from "react";

// components

import CardRegisterUser from "components/Cards/CardRegisterUser";
import { getCollections } from "firebase/firebase";
import CardUsers from "components/Cards/CardUsers";

export default function Users() {

  const [users, setUsers] = React.useState([]);


  const getUsers = async () => {
    const values = [];
    const response = await getCollections("usuarios");
    response.forEach(element => {
      values.push(element.data())
    });
    setUsers(values)
  }

  React.useEffect(() => {
    getUsers()
  }, [])


  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full 2xl:w-8/12 xl:w-8/12 px-4">
          <CardUsers title={"Usuarios"} list={users} />
        </div>
        <div className="w-full 2xl:xl:w-4/12 xl:w-4/12 px-4">
          <CardRegisterUser />
        </div>
      </div>
    </>
  );
}
