import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Table from "../components/Table";
import Modal from '../components/Modal';
import { useRouter } from "next/router";

function Home({ data }) {
  const [dataState, setDataState] = useState([]);
  const [sorted, setSorted] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayQuant, setDisplayQuant] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [selectedUser, setSelectedUser] = useState({name: {first: 'Default'}})
  const [showModal, setShowModal ] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setDataState(data);
  }, []);

  useEffect(() => {
     fetchData();
  }, [displayQuant, currentPage])

  const deleteUser = (userIndex) => {
    const refer = [...dataState];
    refer.splice(userIndex, 1);
    setDataState(refer);
  };

  const fetchData = async () => {
    const res = await fetch(`https://randomuser.me/api/?page=${currentPage}&results=${displayQuant}&seed=abc`);
    const data = await res.json();
    setDataState(data.results);
  };

  const handlePageChange = (option) => {
    if (option === "minus") {
      setCurrentPage((val) => val - 1);
    }
    if (option === "plus") {
      setCurrentPage((val) => val + 1);
    }
  };

  const sortData = (key) => {
    if(key === sorted)
    {
      return;
    }
    const refer = [...dataState];
    if(key === 'country')
    {
      refer.sort((a, b) => {
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
    if(key === '´first_name')
    {
      refer.sort((a, b) => {
        let ca = a.name.first.toLowerCase();
        let cb = b.name.first.toLowerCase();
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
    setSorted(key);
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-8 py-12">
      <h1 className="mt-4 text-2xl font-bold md:text-4xl">
        Avena.io test challenge
      </h1>
      <button
        onClick={() => setDataState(data)}
        className="p-2 my-4 text-xl rounded-lg shadow-lg shadow-slate-600 bg-slate-300"
      >
        Reset Data
      </button>
      {/** Data Table Controllers */}
      <div className="flex flex-col justify-between w-full md:flex-row md:w-[60rem] items-center">
        <div className="flex flex-row items-center justify-start w-fit h-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className={`w-6 h-6 text-slate-400`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            id="search" 
            placeholder="Buscar..."
            onBlur={(e) => setFilterText(e.target.value)} 
            className="px-2 py-1 ml-2 border-2 border-solid rounded-lg select-none border-slate-500 h-fit" 
          />
        </div>
        <div className="flex flex-row items-center justify-start w-fit h-fit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 text-slate-400`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>

          <input 
            placeholder="Cantidad..."
            defaultValue={displayQuant}
            id="quant"
            type="number"
            min={5}
            max={100}
            onChange={(e) => {
              let val = parseInt(e.target.value);
              if(val < 5 || !e.target.value)
              {
                val = 5;
              }
              setDisplayQuant(val);  
            }} 
            className="px-2 py-1 ml-2 border-2 border-solid rounded-lg select-none border-slate-500 h-fit" 
          />
        </div>
        <div className="flex flex-row items-center justify-between py-1 px-2 self-center w-[12rem] md:w-[8rem] my-3 md:self-end">
          <motion.button
            disabled={currentPage === 1}
            whileTap={{ scale: 0.92 }}
            className="cursor-pointer"
            onClick={() => handlePageChange("minus")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-slate-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.button>

          <h3 className="text-lg font-bold select-none">{currentPage}</h3>

          <motion.button
            whileTap={{ scale: 0.92 }}
            className="cursor-pointer"
            onClick={() => handlePageChange("plus")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-slate-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.button>
        </div>
      </div>
      <Table
        onRowSelected={() => {
          setSelectedUser(dataState[0]);
          setShowModal(true);
        }}
        data={dataState}
        sorted={sorted}
        headers={[
          {
            title: "Photo",
            key: "photo",
            isSortable: false,
          },
          {
            title: "First Name",
            key: "first_name",
            isSortable: true,
          },
          {
            title: "Last Name",
            key: "last_name",
            isSortable: false,
          },
          {
            title: "Country",
            key: "country",
            isSortable: true,
          },
        ]}
        sortData={sortData}
        deleteUser={deleteUser}
        className={`w-full md:h-[33rem] md:w-[60rem] mt-2`}
        headerClassName={"bg-slate-300"}
      />
      <Modal
        userData={selectedUser}
        title={`${selectedUser.name.first}'s Details`} 
        visibility={showModal}
        setVisibility={setShowModal}
      />
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://randomuser.me/api/?page=1&results=10&seed=abc");
  const data = await res.json();

  return { props: { data: data.results } };
}

export default Home;
