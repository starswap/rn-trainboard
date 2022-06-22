import { Insets } from 'react-native';

export const getEqualHitSlop = (size: number): Insets => {
  return {
    top: size,
    bottom: size,
    left: size,
    right: size,
  };
};
