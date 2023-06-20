import React from 'react';
import { TailSpin } from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <TailSpin
        color="#DE262D"
        height="50"
        width="200"
        ariaLabel="tail-spin-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        radius="1"
      />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
