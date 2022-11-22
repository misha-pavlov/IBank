import { isEqual } from 'lodash';
import { Stack } from 'native-base';
import React, { FC, memo } from 'react';
import RoundButton from './components/RoundButton/RoundButton';

type TKeyboard = {
  setNumber: (number: number) => void;
  removeLastNumber: () => void;
};

const Keyboard: FC<TKeyboard> = ({ setNumber, removeLastNumber }) => {
  return (
    <Stack pl="12%" pr="12%">
      <Stack flexDirection="row" justifyContent="space-between">
        <RoundButton text={1} onPress={() => setNumber(1)} />
        <RoundButton text={2} onPress={() => setNumber(2)} />
        <RoundButton text={3} onPress={() => setNumber(3)} />
      </Stack>

      <Stack flexDirection="row" justifyContent="space-between">
        <RoundButton text={4} onPress={() => setNumber(4)} />
        <RoundButton text={5} onPress={() => setNumber(5)} />
        <RoundButton text={6} onPress={() => setNumber(6)} />
      </Stack>

      <Stack flexDirection="row" justifyContent="space-between">
        <RoundButton text={7} onPress={() => setNumber(7)} />
        <RoundButton text={8} onPress={() => setNumber(8)} />
        <RoundButton text={9} onPress={() => setNumber(9)} />
      </Stack>

      <Stack flexDirection="row" justifyContent="space-between">
        <RoundButton text={0} onPress={() => setNumber(0)} isEmptyButton />
        <RoundButton text={0} onPress={() => setNumber(0)} />
        <RoundButton text={0} onPress={removeLastNumber} isRemoveButton />
      </Stack>
    </Stack>
  );
};

export default memo(Keyboard, isEqual);
