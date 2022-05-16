import React from "react";

// components

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
        <div className="w-full px-4">
          <CardUsers title={"Usuarios"} list={users} />
        </div>
      </div>
    </>
  );
}
