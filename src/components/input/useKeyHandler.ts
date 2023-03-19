import React from 'react';
import { useRef, useState } from 'react';
import { Props } from './Input';
import { User } from '@/types/userData';

const useKeyHandler = () => {
  const listBoxRef = useRef<HTMLUListElement>(null);
  const [targetFilter, setTargetFilter] = useState('age');
  const [stateData, setStateData] = useState<Props>({
    originData: [],
    userData: [],
    isNull: true,
    focusingIndex: 0,
    originIndex: 0,
    currentInputValue: '',
  });

  const visibleDataLength =
    stateData.originData.length > 4 ? 5 : stateData.originData.length;
  const sliceData = stateData.userData.slice(0, visibleDataLength);

  const handleArrowDown = () => {
    const { focusingIndex, originIndex, originData } = stateData;
    const isLastItemVisible = focusingIndex === visibleDataLength - 1;
    const isLastItemInData = originIndex === originData.length - 1;

    if (focusingIndex < visibleDataLength - 1 && originIndex >= 0) {
      setStateData((prevState) => ({
        ...prevState,
        focusingIndex: prevState.focusingIndex + 1,
        originIndex: prevState.originIndex + 1,
      }));
    } else if (
      isLastItemVisible &&
      originIndex >= visibleDataLength - 1 &&
      !isLastItemInData
    ) {
      setStateData((prevState) => ({
        ...prevState,
        focusingIndex: visibleDataLength - 1,
        userData: prevState.originData.slice(originIndex - 3, originIndex + 2),
        originIndex: prevState.originIndex + 1,
      }));
    } else if (isLastItemVisible && isLastItemInData) {
      setStateData((prevState) => ({
        ...prevState,
        focusingIndex: 0,
        userData: prevState.originData.slice(0, visibleDataLength),
        originIndex: 0,
      }));
    }
  };

  const handleArrowUp = () => {
    const { focusingIndex, originIndex, originData } = stateData;

    if (focusingIndex === 0 && originIndex === 0) {
      setStateData((prevState) => ({
        ...prevState,
        userData: prevState.originData.slice(-visibleDataLength),
        focusingIndex: visibleDataLength - 1,
        originIndex: prevState.originData.length - 1,
      }));
      return;
    }

    if (focusingIndex === 0 && originIndex > 0) {
      setStateData((prevState) => ({
        ...prevState,
        focusingIndex: 0,
        userData: prevState.originData.slice(
          originIndex - 1,
          originIndex + visibleDataLength - 1
        ),
        originIndex: prevState.originIndex - 1,
      }));
      return;
    }

    if (originIndex > 0) {
      setStateData((prevState) => ({
        ...prevState,
        focusingIndex: prevState.focusingIndex - 1,
        originIndex: prevState.originIndex - 1,
      }));
    }
  };

  const handleEnter = () => {
    setStateData((prevState) => ({
      ...prevState,
      currentInputValue:
        prevState.userData[prevState.focusingIndex].name +
        ` (${
          prevState.userData[prevState.focusingIndex][
            targetFilter as keyof User
          ]
        })`,
      isNull: true,
      focusingIndex: 0,
    }));
  };
  return {
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
  };
};

export default useKeyHandler;
