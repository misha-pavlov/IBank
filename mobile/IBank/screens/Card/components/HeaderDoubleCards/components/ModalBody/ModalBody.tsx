import { AddIcon, Avatar, Center, Divider, Flex, View } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import CardIcon from '../../../../../../assets/svg/CardIcon';
import Settings from '../../../../../../assets/svg/Settings';
import { WhiteText } from '../../../../../../common/common.styles';
import IBankGrayButton from '../../../../../../components/IBankGrayButton/IBankGrayButton';
import { colors } from '../../../../../../config/colors';
import { CardCube, SectionGradient } from './ModalBody.styles';

const ModalBody = () => {
  return (
    <View flex={1} pl={8} pr={8}>
      <Center mt={50}>
        <Avatar
          bg={colors.pinkA100}
          size="lg"
          source={{
            uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
          }}>
          FN
          <Avatar.Badge bg={colors.gray100}>
            <TouchableOpacity>
              <Settings width={16} height={16} fill={colors.black} />
            </TouchableOpacity>
          </Avatar.Badge>
        </Avatar>
      </Center>

      <Center mt="20px">
        <WhiteText fontWeight={600} fontSize={18}>
          First Last
        </WhiteText>
      </Center>

      <Center mt={25} flexDirection="row" justifyContent="space-between">
        <IBankGrayButton text="💎 Statistics" onPress={() => console.log('123')} w={150} />
        <IBankGrayButton text="💰 Capital" onPress={() => console.log('123')} w={150} />
      </Center>

      <Center mt={25}>
        <SectionGradient
          colors={[colors.gray400, colors.gray500, colors.gray600]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 0.7, y: 0.25 }}
          locations={[1, 0.5, 0]}>
          <WhiteText fontWeight={600} fontSize={16}>
            Your cards
          </WhiteText>

          <Flex flexDirection="row" justifyContent="space-between" mt={15}>
            <TouchableOpacity>
              <CardCube isSelectedCard>
                <CardIcon width={32} height={32} fill={colors.black1} />
              </CardCube>
              <WhiteText mt="5px" textAlign="center">
                n $
              </WhiteText>
            </TouchableOpacity>

            <TouchableOpacity>
              <CardCube>
                <CardIcon width={32} height={32} fill={colors.pink500} />
              </CardCube>
              <WhiteText mt="5px" textAlign="center">
                n $
              </WhiteText>
            </TouchableOpacity>

            <TouchableOpacity>
              <CardCube>
                <CardIcon width={32} height={32} fill={colors.blueGray500} />
              </CardCube>
              <WhiteText mt="5px" textAlign="center">
                n $
              </WhiteText>
            </TouchableOpacity>
          </Flex>

          {/* Hide next section if user already have a 3 cards */}
          <Divider bg={colors.blueGray700} mt={25} mb={15} />

          <TouchableOpacity>
            <Flex flexDirection="row" justifyContent="center" alignItems="center">
              <View backgroundColor={colors.gray100} borderRadius={50} p="2px" mr="5px">
                <AddIcon color={colors.black} size="xs" />
              </View>

              <WhiteText>Add a new card</WhiteText>
            </Flex>
          </TouchableOpacity>
        </SectionGradient>
      </Center>
    </View>
  );
};

export default ModalBody;
