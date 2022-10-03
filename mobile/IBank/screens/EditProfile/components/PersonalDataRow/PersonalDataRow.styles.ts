import styled from 'styled-components/native';

export const IconWrapper = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-right: 15px;
  padding: 10px;
`;
