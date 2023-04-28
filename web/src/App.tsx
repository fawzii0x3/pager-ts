import { useState } from "react";
import "./App.scss";
import { useLoginMutation, useMeUserQuery } from "./gql/graphql";


function App() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [,Login] = useLoginMutation()
  const [data,] = useMeUserQuery()
console.log(data)
  const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form
      onSubmit={async(e) => {
        e.preventDefault();
        const res = await Login({data:form})
        console.log(res)
      }}
    >
      <input type="email" name="email" onChange={ChangeHandler} />
      <input type="password" name="password" onChange={ChangeHandler} />
      <button>submit</button>
    </form>
  );
}

export default App;
