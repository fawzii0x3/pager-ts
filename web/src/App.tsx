import { useEffect } from "react";
import "./App.css";
import { useUsersQuery, useCreateUserMutation } from "./gql/graphql";

function App() {
  const [fullInfo, reloadUsersQuery] = useUsersQuery();
  console.log(fullInfo);
  const [data, ror] = useCreateUserMutation();
  useEffect(() => {
    async () => {
      await ror({
        data: {
          age: 40,
          firstName: "mohamed",
          lastName: "ben chikha",
        },
      });
    };
  }, []);

  return (
    <form>
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </form>
  );
}

export default App;
