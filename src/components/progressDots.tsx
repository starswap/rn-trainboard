import React from 'react';
import { View, Image } from 'react-native';

type ProgressDotsProps = {
  numOfDots: number;
};

export const ProgressDots: React.FC<ProgressDotsProps> = ({ numOfDots }) => {
  console.log(Array(numOfDots));
  // console.log(
  //   Array(numOfDots).map((_, i) => (
  //     <Image
  //       key={i}
  //       // style={{ width: 80, height: '100%' }}
  //       // resizeMode="contain"
  //       source={require('../../assets/splash.png')}
  //     ></Image>
  //   )),
  // );
  const dots = [];
  for (let i = 0; i < numOfDots; ++i) {
    dots.push(
      <Image
        key={i}
        style={{ width: 10, height: 20}}
        resizeMode="contain"
        source={require('../../assets/circle.png')}
      ></Image>,
    );
  }

  return <View style={{paddingLeft: 10}}>{dots}</View>;
};
