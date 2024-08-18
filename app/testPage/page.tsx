'use client';

import Layout from '../components/layout'

const Test: React.FC = () => {
  async function printUUID() {
    await fetch('/api/token');
  }

  return (
    <Layout>
       <div style={{padding: 100}}>
      <button onClick={printUUID}>Click here</button>
    </div> 
    </Layout>
    
  );
};

export default Test;
