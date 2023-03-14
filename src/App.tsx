import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from './types/userData';
import { S3_API_URL } from './configs';
import Input from './components/Input';

const App = () => {
  const baseUrl: string = S3_API_URL;

  const [json, setJson] = useState<User[]>([]);

  const getData = async () => {
    const data = await axios.get(baseUrl);
    setJson(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div
        css={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div>
          <Input json={json} />
        </div>
      </div>
    </>
  );
};
export default App;
