import React, {
  ChangeEvent,
  useState,
  useRef,
  KeyboardEvent,
  useCallback,
} from 'react';
import { handler } from '@/api/powerApi';
import { User } from '@/types/userData';
import useKeyHandler from './useKeyHandler';

export interface Props {
  originData: User[];
  userData: User[];
  isNull: boolean;
  focusingIndex: number;
  originIndex: number;
  currentInputValue: string;
}

const Input = () => {
  // prop destruction
  const {
    listBoxRef,
    targetFilter,
    setTargetFilter,
    stateData,
    setStateData,
    visibleDataLength,
    sliceData,
    handleArrowDown,
    handleArrowUp,
    handleEnter,
  } = useKeyHandler();
  // lib hooks
  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  const getUserData = useCallback(
    async (inputs: string) => {
      const data: User[] = await handler(inputs);
      setStateData((prevState) => {
        return { ...prevState, userData: data, originData: data };
      });
    },
    [stateData.userData]
  );

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
    setStateData((prevState) => ({
      ...prevState,
      currentInputValue: inputValue,
      focusingIndex: 0,
      originIndex: 0,
      isNull: !inputValue,
    }));
  };

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTargetFilter(e.currentTarget.value);
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
          <ul css={{ listStyle: 'none', width: '100%' }} ref={listBoxRef}>
            {sliceData.map((data, index) => {
              return (
                <li
                  key={data.id}
                  onClick={() => {
                    setStateData({
                      ...stateData,
                      currentInputValue:
                        stateData.userData[stateData.focusingIndex].name +
                        ` (${
                          stateData.userData[stateData.focusingIndex][
                            targetFilter as keyof User
                          ]
                        })`,
                      isNull: true,
                    });
                  }}
                  css={{
                    padding: '5px',
                    backgroundColor:
                      stateData.focusingIndex === index ? '#bfeff9' : 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    wordWrap: 'break-word',
                    '&:hover': {
                      backgroundColor: '#bfeff9',
                    },
                  }}
                >
                  {data.name + ` (${data[targetFilter as keyof User]})`}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div css={{ marginTop: '10px' }}>
        <fieldset
          css={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            border: 'none',
          }}
        >
          <label>
            <input
              defaultChecked
              value='age'
              name='check'
              type='radio'
              onChange={onFilterChange}
            />
            나이
          </label>
          <label>
            <input
              value='gender'
              name='check'
              type='radio'
              onChange={onFilterChange}
            />
            성별
          </label>
          <label>
            <input
              value='phone'
              name='check'
              type='radio'
              onChange={onFilterChange}
            />
            전화번호
          </label>
          <label>
            <input
              value='address'
              name='check'
              type='radio'
              onChange={onFilterChange}
            />
            주소
          </label>
          <label>
            <input
              value='email'
              name='check'
              type='radio'
              onChange={onFilterChange}
            />
            메일
          </label>
        </fieldset>
      </div>
    </div>
  );
};

export default Input;
