import React from 'react';
import { VscLoading } from 'react-icons/vsc';

interface Props {
  styles?: string;
}

const StateLoader = (props: Props) => {
  return <VscLoading className={`${props?.styles} animate-spin ml-2`} />;
};

export default StateLoader;
