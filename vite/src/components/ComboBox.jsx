import React, { useEffect, useRef, useState } from 'react';
import './ComboBox.css';

const ComboBox = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const optionsRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter(option => option.السائق_اسم.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, options]);

  const handleSelect = (option) => {
    onSelect(option);
    setSearchTerm(option.السائق_اسم);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={inputRef} data-hs-combo-box="">
  <div className="relative">
  <input
    type="text"
    value={searchTerm}
    onChange={handleInputChange}
    onClick={toggleDropdown}
    className="py-3 ps-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
    placeholder="Select Driver"
    aria-expanded={isOpen}
    data-hs-combo-box-input=""
    style={{ marginLeft: '210%' }}
  />
  {isOpen && (
    <div
      className="  right-3 transform -translate-y-1/2"
      aria-expanded={isOpen}
      onClick={toggleDropdown}
      data-hs-combo-box-toggle=""
      style={{marginLeft:'300%',marginTop:'-15px'}}
    >
      <svg
        className="shrink-0 size-3.5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
      </svg>
    </div>
  )}
</div>

      {isOpen && (
        <div
          className="absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
          style={{ display: isOpen ? 'block' : 'none', width: '550%', marginLeft: '5%', marginTop:'10px' }}
          data-hs-combo-box-output=""
          ref={optionsRef}
        >
          {filteredOptions.length > 0 ? (
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th scope="col" className="px-10 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th scope="col" className="px-9 text-start text-xs font-medium text-gray-500 uppercase" >Iqama #</th>
                          <th scope="col" className="px-7 text-start text-xs font-medium text-gray-500 uppercase">Company</th>
                          <th scope="col" className="px-8 text-end text-xs font-medium text-gray-500 uppercase">Vehicle#</th>
                          <th scope="col" className="px-8 text-end text-xs font-medium text-gray-500 uppercase">Mobile#</th>
                          <th scope="col" className="px-8 text-end text-xs font-medium text-gray-500 uppercase">Plate#</th>
                          <th scope="col" className="px-7 text-end text-xs font-medium text-gray-500 uppercase">Nationality</th>
                        </tr>
                      </thead>
                   
                      </table>
                        {filteredOptions.map((option) => (

                       <div
                       key={option._id}
                       onClick={() => handleSelect(option)}
                       className=" rounded-lg  items-center"
                   
                     >
                      <div className="flex cursor-pointer hover:bg-gray-200 rounded-lg" style={{marginTop:'5px'}}>
                       <span className="field" style={{ }}>{option.السائق_اسم}</span>
                       <span className="field" style={{  }}>{option.السائق_هوية_رقم}</span>
                       <span className="field" style={{ }}>{option.شركة_النقل_اسم}</span>
                       <span className="field" style={{ }}>{option.المركبة_رقم}</span>
                       <span className="field" style={{}}>{option.السائق_جوال}</span>
                       <span className="field" style={{}}>{option.اللوحة_رقم}</span>
        
                       <span className="field" style={{ }}>{option.السائق_جنسية}</span>
                       </div>
                       <div style={{color:'rgb(222, 219, 219)'}}>______________________________________________________________________________________________________________________________________________________</div>
                     </div>
                    
                     
                        ))}
                     
                    
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-2 px-4 text-sm text-gray-800">
              No results found
            </div>
          )}
        </div>
      )}
     
    </div>
  );
};

export default ComboBox;
