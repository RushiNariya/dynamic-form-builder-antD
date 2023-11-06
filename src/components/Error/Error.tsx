import React from 'react';

function Error({ error }: { error: string }) {
  return (
    <div className="min-h-[30vh] flex justify-center items-center text-xl">{error}</div>
  );
}

export default Error;
