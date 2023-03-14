import { Global, css, jsx } from '@emotion/react';

export const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
      }
      html {
        font-size: 30px;
      }
      body {
        font-family: 'Noto Sans KR', sans-serif;
      }

      div {
        box-sizing: border-box;
      }
    `}
  />
);
