import React, { ChangeEvent, useState } from 'react';
import { User } from '@/types/userData';

interface Props {
  json: User[];
}

const Input = (props: Props) => {
  const { json } = props;
  const [inputs, setInputs] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputs(e.target.value);
  };

  const jsonFilter = json.filter((data) => data.name.includes(inputs));

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
        css={{
          marginTop: '10px',
          width: '270px',
          height: '30px',
          borderRadius: 8,
          padding: '11px 16px 11px 16px',
          fontSize: '20px',
          outline: 'none',
          '&:focus': {
            border: '2px solid #5555FF',
          },
        }}
      ></input>
      {inputs && (
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid black',
          }}
        >
          {jsonFilter.slice(0, 10).map((data) => {
            return (
              <span
                css={{
                  fontSize: '20px',
                }}
              >
                {data.name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Input;
