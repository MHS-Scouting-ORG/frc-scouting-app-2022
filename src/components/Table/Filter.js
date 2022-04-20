import React from 'react';

const GlobalFilter = ({filter, set}) => {
 return (
     <span>
         Search: {' '}
         <input value={filter || ''} onChange={e => set(e.target.value)}/>
     </span>
 );
}

export default GlobalFilter;