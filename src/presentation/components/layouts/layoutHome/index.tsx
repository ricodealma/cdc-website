import { ReactNode } from 'react';
import Cabecalho from './cabecalho';
import Rodape from './rodape';

interface Props {
  children: ReactNode;
}
const LayoutHome = ({ children }: Props) => {
  return (
    <>
      <Cabecalho />
      {children}
      <Rodape />
    </>
  );
};

export default LayoutHome;
