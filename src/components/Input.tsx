import React, {
  ChangeEvent,
  useState,
  useRef,
  KeyboardEvent,
  useCallback,
} from 'react';
import { handler } from '@/api/powerApi';
import { User } from '@/types/userData';

interface Props {
  userData: User[];
  isNull: boolean;
  focusingIndex: number;
  currentInputValue: string;
}

const Input = () => {
  // prop destruction
  // lib hooks
  // state, ref, querystring hooks
  const listBoxRef = useRef<HTMLUListElement>(null);
  const [stateData, setStateData] = useState<Props>({
    userData: [],
    isNull: true,
    focusingIndex: 0,
    currentInputValue: '',
  });
  // const [userData, setUserData] = useState<User[]>([]);
  // const [isNull, setIsNull] = useState<boolean>(true);
  // const [focusingIndex, setFocusingIndex] = useState<number>(0);
  // const [currentInputValue, setCurrentInputValue] = useState<string>('');
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  const getUserData = useCallback(
    async (inputs: string) => {
      const data = await handler(inputs);
      setStateData((stateData) => {
        return { ...stateData, userData: data };
      });
    },
    [stateData.userData]
  );

  const handleArrowDown = () => {
    if (listBoxRef.current?.childElementCount === stateData.focusingIndex + 1) {
      if (stateData.userData[stateData.focusingIndex + 1]) {
        setStateData((prevState) => ({
          ...prevState,
          userData: prevState.userData.filter(
            (user, index) => prevState.focusingIndex - 4 !== index
          ),
        }));
      } else {
        getUserData(stateData.currentInputValue);
        setStateData((prevState) => ({
          ...prevState,
          focusingIndex: 0,
        }));
      }
    } else {
      setStateData((prevState) => ({
        ...prevState,
        focusingIndex: prevState.focusingIndex + 1,
      }));
    }
  };

  const handleArrowUp = () => {
    if (stateData.focusingIndex === 0) {
      setStateData((prevState) => ({
        ...prevState,
        focusingIndex: prevState.userData.length - 1,
        userData: prevState.userData.filter(
          (user, index) => index !== prevState.focusingIndex
        ),
      }));
    } else {
      setStateData((prevState) => ({
        ...prevState,
        focusingIndex: prevState.focusingIndex - 1,
      }));
    }
  };

  const handleEnter = () => {
    setStateData((prevState) => ({
      ...prevState,
      currentInputValue: prevState.userData[prevState.focusingIndex].name,
      isNull: true,
      focusingIndex: 0,
    }));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    switch (e.key) {
      case 'ArrowDown':
        handleArrowDown();
        break;
      case 'ArrowUp':
        handleArrowUp();
        break;
      case 'Enter':
        handleEnter();
        break;
      default:
        break;
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    getUserData(inputValue);
    setStateData((stateData) => {
      return {
        ...stateData,
        currentInputValue: inputValue,
        focusingIndex: 0,
        isNull: false,
      };
    });
    if (!inputValue)
      return setStateData((stateData) => {
        return { ...stateData, isNull: true };
      });
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
        onKeyDown={onKeyDown}
        value={stateData.currentInputValue}
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
      {stateData.userData.length !== 0 && !stateData.isNull && (
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
            {stateData.userData.slice(0, 5).map((data, index) => {
              return (
                <li
                  key={data.id}
                  onClick={() => {
                    setStateData({
                      ...stateData,
                      currentInputValue: data.name,
                      isNull: true,
                    });
                  }}
                  css={{
                    padding: '5px',
                    backgroundColor:
                      stateData.focusingIndex === index ? '#bfeff9' : 'white',
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
