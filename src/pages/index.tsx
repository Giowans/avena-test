import { useEffect, useState } from "react";

function Home({ data }) {
  const [dataState, setDataState] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    setDataState(data);
  }, []);

  const deleteUser = (userIndex: number) => {
    const refer = [...dataState];
    const newUsers = refer.splice(userIndex, 1);
    setDataState(refer);
  };

  const sortData = () => {
    const refer = [...dataState];
    if (isSorted) {
      refer.reverse();
    } else {
      refer.sort((a: any, b: any) => {
        let ca = a.location.country.toLowerCase();
        let cb = b.location.country.toLowerCase();
        if (ca < cb) {
          return -1;
        }
        if (ca > cb) {
          return 1;
        }
        return 0;
      });
    }
    setDataState(refer);
    setIsSorted((val) => !val);
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1>Avena.io test challenge</h1>
      <button
        onClick={() => setDataState(data)}
        className="p-2 my-4 text-xl font-bold rounded-lg bg-slate-800"
      >
        Reset Data
      </button>
      <table className="w-[44rem]">
        <tbody>
          <tr className="flex flex-row justify-between p-4 border border-0 rounded-lg bg-slate-700">
            <th className="font-bold">Photo</th>
            <th className="font-bold">First Name</th>
            <th className="font-bold">Last Name</th>
            <th className="flex flex-row font-bold">
              Country
              <button className="ml-2" onClick={() => sortData()}>
                {isSorted ? "(sort me DESC)" : "(sort me ASC)"}
              </button>
            </th>
            <th className="font-bold">Actions</th>
          </tr>
          {dataState.map((user: any, index: number) => {
            return (
              <tr
                className={`flex flex-row justify-between ${
                  index % 2 === 0 ? "bg-stone-600" : "bg-stone-900"
                }`}
              >
                <td>
                  <img
                    alt={`user-${index}`}
                    src={user.picture.thumbnail}
                    width={40}
                    height={40}
                  />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <div>
                    <button
                      onClick={() => deleteUser(index)}
                      className="p-2 text-sm bg-red-500 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://randomuser.me/api/?results=100");
  const data = await res.json();

  return { props: { data: data.results } };
}

export default Home;
