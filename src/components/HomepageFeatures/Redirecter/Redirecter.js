import React from 'react';
import { useHistory,useLocation } from '@docusaurus/router';
import { useEffect } from 'react';
import { useData } from '../../../theme/Root';
import allDocs from './allDocs.json'

function Redirecter() {
    const history = useHistory();
    const location = useLocation();
    const { data, setData } = useData();

    useEffect(() => {
        console.log(allDocs)
        console.log(data.material)
        console.log(allDocs.indexOf(data.material),allDocs.indexOf(location.pathname))
        if(!data.status){
            history.push('/');
        }else if(data.status === 3 && !data.material){
            history.push('/');
        }else if(data.status === 3 && allDocs.indexOf(data.material) < allDocs.indexOf(location.pathname)){
            history.push('/');
        }
    },[])
  return (
    <div></div>
  )
}
export default Redirecter