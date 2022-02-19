import React from 'react';
import { Data } from './SampleData.js';


export const Columns = function(props){

    const makeColumns = function(a){
        return{
          Header: a,
          accessor: a
        }
      }
    
      return(
        () =>
          Object.keys(Data[1]).map(makeColumns),
          []
      )
     }