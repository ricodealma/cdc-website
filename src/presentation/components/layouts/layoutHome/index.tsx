import { ReactNode } from 'react';
import QueryProvider from '../../providers/queryProvider';
import Cabecalho from './cabecalho';
import Rodape from './rodape';

interface Props {
  children: ReactNode;
}
const LayoutHome = ({ children }: Props) => {
  return (
    <QueryProvider>
      <Cabecalho />
      {children}
      <Rodape />
    </QueryProvider>
  );
};

export default LayoutHome;
