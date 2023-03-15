import React, {
  ChangeEvent,
  useState,
  useRef,
  KeyboardEvent,
  useCallback,
} from 'react';
import { handler } from '@/api/powerApi';
import { User } from '@/types/userData';

const Input = () => {
  // prop destruction
  // lib hooks
  // state, ref, querystring hooks
  const listBoxRef = useRef<HTMLUListElement>(null);
  const [userData, setUserData] = useState<User[]>([]);
  const [isNull, setIsNull] = useState<boolean>(true);
  const [focusingIndex, setFocusingIndex] = useState<number>(0);
  const [currentInputValue, setCurrentInputValue] = useState<string>('');
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  const getUserData = useCallback(
    async (inputs: string) => {
      const data = await handler(inputs);
      setUserData(data);
    },
    [userData]
  );

  const onkeydown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'ArrowDown') {
      if (listBoxRef.current!.childElementCount === focusingIndex + 1) {
        if (userData[focusingIndex + 1]) {
          setUserData(
            userData.filter((user, index) => focusingIndex - 4 !== index)
          );
        } else {
          getUserData(currentInputValue);
          setFocusingIndex(0);
        }
      } else {
        setFocusingIndex(focusingIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      if (focusingIndex === 0) {
        setFocusingIndex(userData.length - 1);
        setUserData(userData.filter((user, index) => index !== focusingIndex));
      } else {
        setFocusingIndex(focusingIndex - 1);
      }
    }

    if (e.key === 'Enter') {
      setCurrentInputValue(userData[focusingIndex].name);
      setIsNull(true);
      setFocusingIndex(0);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    getUserData(inputValue);
    setCurrentInputValue(inputValue);
    setFocusingIndex(0);
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
          <ul css={{ listStyle: 'none' }} ref={listBoxRef}>
            {userData.slice(0, 5).map((data, index) => {
              return (
                <li
                  key={data.id}
                  onClick={() => {
                    setCurrentInputValue(data.name);
                    setIsNull(true);
                  }}
                  css={{
                    padding: '5px',
                    backgroundColor:
                      focusingIndex === index ? '#bfeff9' : 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#bfeff9',
                    },
                  }}
                >
                  {data.name + `(${data.age})`}
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
