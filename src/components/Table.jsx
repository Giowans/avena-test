import Image from "next/image";
import { motion } from 'framer-motion';

const Table = ({ data, headers, className, headerClassName, sortData, sorted, deleteUser, onRowSelected}) => {
  //State

  //Effects

  return (
    <table className={`flex flex-col ${className}`}>
      <tbody>
        <tr className={`flex flex-row justify-between p-4 border border-0 rounded-tl-lg rounded-tr-lg bg-slate-700 ${headerClassName}`}>
          {headers.map((head, index) => {
            if(head.isSortable)
            {
              return (
                <th className="flex flex-row items-center justify-center text-sm select-none md:text-lg">
                  {head.title}
                  <motion.div
                    whileTap={{scale: 0.92}} 
                    className="ml-1 cursor-pointer md:ml-3" onClick={() => sortData()}
                    animate = {{rotate: sorted === head.key ? 180 : 0}}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:h-6 md:w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                </th>
              )
            }
            else
            {
              return <th className="flex flex-row items-center text-sm select-none md:text-lg">{head.title}</th>
            }
          })}
          <th className="font-bold select-none">Actions</th>
        </tr>
        {data.map((user, index) => {
            return (
              <tr
                onClick={() => onRowSelected()}
                key={`userData-${index}`}
                className={`flex cursor-pointer flex-row items-center justify-between py-1 px-3 ${
                  index % 2 === 0 ? "bg-stone-200" : "bg-stone-100"
                }`}
              >
                <td>
                  <Image
                    className="rounded-lg"
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
                      className="p-2 text-sm duration-200 bg-red-300 rounded-lg cursor-pointer hover:bg-red-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  )
}

export default Table;