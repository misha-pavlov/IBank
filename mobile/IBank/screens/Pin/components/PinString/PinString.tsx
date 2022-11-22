import { isEqual } from 'lodash';
import { Center } from 'native-base';
import React, { memo } from 'react';
import { PinPoint } from './PinString.styles';

const PinString = ({ enteredLength }: { enteredLength: number }) => {
  return (
    <Center flexDirection="row">
      <PinPoint isSetPoint={enteredLength > 0} />
      <PinPoint isSetPoint={enteredLength > 1} />
      <PinPoint isSetPoint={enteredLength > 2} />
      <PinPoint isSetPoint={enteredLength === 4} />
    </Center>
  );
};

export default memo(PinString, isEqual);
