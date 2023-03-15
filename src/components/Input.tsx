import React, { ChangeEvent, useState, useRef, KeyboardEvent } from 'react';
import { useEffect } from 'react';
import { handler } from '@/api/powerApi';
import { User } from '@/types/userData';

const Input = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const [focusingIndex, setFocusingIndex] = useState<number>(-1);
  const [currentInputValue, setCurrentInputValue] = useState<string>('');
  const [isNull, setIsNull] = useState<boolean>(true);
  const [userData, setUserData] = useState<User[]>([]);

  const getUserData = async (inputs: string) => {
    const data = await handler(inputs);
    setUserData(data);
  };

  const onkeydown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'ArrowDown') {
      console.log(currentInputValue);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    getUserData(inputValue);
    setCurrentInputValue(inputValue);
    setIsNull(false);
    if (!inputValue) return setIsNull(true);
  };

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
      }}
    >
      <input
        type='text'
        onChange={onChange}
        onKeyDown={onkeydown}
        value={currentInputValue}
        css={{
          marginTop: '10px',
          width: '270px',
          height: '30px',
          borderRadius: 8,
          padding: '11px 16px 11px 16px',
          fontSize: '20px',
          outline: 'none',
          '&:focus': {
            outline: '3px solid #5555FF',
          },
        }}
      ></input>
      {userData.length !== 0 && !isNull && (
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginTop: '10px',
            border: '1px solid black',
            position: 'absolute',
            boxShadow: `3px 2px 0px black`,
            top: '100%',
          }}
        >
          <ul css={{ listStyle: 'none' }} ref={listRef}>
            {userData.slice(0, 5).map((data, i) => {
              return (
                <li
                  key={data.id}
                  onClick={() => {
                    setCurrentInputValue(data.name);
                    setIsNull(true);
                  }}
                  css={{
                    backgroundColor: 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: '#bfeff9',
                    },
                  }}
                >
                  {data.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Input;
