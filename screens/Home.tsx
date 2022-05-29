import React, {FunctionComponent} from 'react';
import {StatusBar} from 'expo-status-bar';
import styled from 'styled-components/native';

// custom components
import {colors} from '../components/colors';
import {Container} from '../components/shared';
import CardSection from '../components/Cards/CardSection';
import TransactionSection from '../components/Transactions/TransactionSection';
import SendMoneySection from '../components/SendMoney/SendMoneySection';

const HomeContainer = styled(Container)`
  background-color: ${colors.graylight};
  width: 100%;
  flex: 1;
`;

// images
import master_card from '../assets/cards/master_card.png';
import visa from '../assets/cards/visa.png';
import cody from '../assets/avi/cody.png';
import harleen from '../assets/avi/harleen.png';
import james from '../assets/avi/james.jpg';

// types
import {RootStackParamList} from '../navigators/RootStack';
import {StackScreenProps} from '@react-navigation/stack';
export type Props = StackScreenProps<RootStackParamList, 'Home'>;

const Home: FunctionComponent<Props> = () => {
  const cardsData = [
    {
      id: 1,
      accountNo: "1111111111",
      balance: 20000.50,
      alias: "Work Debit",
      logo: master_card,
    },
    {
      id: 2,
      accountNo: "1111111112",
      balance: 10000.20,
      alias: "Personal Prepaid",
      logo: visa,
    },
    {
      id: 3,
      accountNo: "1111111113",
      balance: 4000.00,
      alias: "School Prepaid",
      logo: visa,
    }
  ];

  const transactionData = [
    {
      id: 1,
      amount: '-$86.00',
      date: '14 Sep 2021',
      title: 'Taxi',
      subtitle: 'Uber Car',
      art: {
        background: colors.primary,
        icon: 'car',
      },
    },
    {
      id: 2,
      amount: '-$286.00',
      date: '14 Sep 2021',
      title: 'Shopping',
      subtitle: 'Ali Express',
      art: {
        background: colors.tertiary,
        icon: 'cart',
      },
    },
    {
      id: 3,
      amount: '-$586.00',
      date: '14 Aug 2021',
      title: 'Travel',
      subtitle: 'Emirates',
      art: {
        background: colors.accent,
        icon: 'airplane',
      },
    },
  ];

  const sendMoneyData = [
    {
      id: 1,
      amount: "2450.50",
      name: "Cody Andoh",
      background: colors.tertiary,
      img: cody,
    },
    {
      id: 2,
      amount: "2250.55",
      name: "Harleen Scot",
      background: colors.primary,
      img: harleen,
    },
    {
      id: 3,
      amount: "6250.40",
      name: "James Corbyn",
      background: colors.accent,
      img: james,
    },
  ];

  return (
    <HomeContainer>
      <StatusBar style="dark"/>
      <CardSection data={cardsData} />
      <TransactionSection data={transactionData} />
      <SendMoneySection data={sendMoneyData} />
    </HomeContainer>
  );
};

export default Home;