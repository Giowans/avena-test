const Modal = ({ userData, visibility, setVisibility, className, id, title, ref, children, onHide}) => {

  const hideModal = () => {
    setVisibility(false);
    if(onHide)
    {
      onHide();
    }
  };
  
  return (
    <div
    id={ id }
    ref={ ref }
    className={`
      ${ !visibility ? 'hidden' : '' }
      fixed inset-0 inset-x-0 z-50 flex items-center w-full h-full bg-black bg-opacity-80
      ${className}
    `}
    >

      <div className="w-11/12 mx-auto text-white rounded-lg md:w-10/12 bg-slate-200">
        <div className="flex justify-between px-5 py-3 mb-5 text-2xl text-black md:text-2xl">
          { title }

          <button onClick={hideModal} className="focus:outline-none">
            <svg
              className="text-black w-7 h-7 md:w-6 md:h-6"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="h-full">
          { children }
        </div>
      </div>

    </div>
  );
}

export default Modal;