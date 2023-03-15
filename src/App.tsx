import { useState, useEffect } from 'react';
import { handler } from './api/powerApi';
import { User } from './types/userData';
import Input from './components/Input';

const App = () => {
  return (
    <>
      <div
        css={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#aec8f1',
        }}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <span css={{ color: '#02024e', fontSize: '30px', fontWeight: '600' }}>
            Power Input
          </span>
          <Input />
        </div>
      </div>
    </>
  );
};
export default App;
