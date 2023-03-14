import { useState, useEffect } from 'react';
import axios from 'axios';
import { S3_API_URL } from './configs';
import Input from './components/Input';

const App = () => {
  const baseUrl = S3_API_URL;
  const getData = async () => {
    const data = await axios.get(baseUrl);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      css={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Input />
    </div>
  );
};
export default App;
