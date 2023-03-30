import * as React from 'react';
import PreView from './PreView';

interface IPublicProps {
}

const Public: React.FunctionComponent<IPublicProps> = (props) => {
  return <div className='publish_page'>
  
<PreView/>
  </div>
};

export default Public;
