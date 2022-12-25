import { RouteProps } from 'react-router-dom';
import { UserRole } from '@/entities/User/model/consts/userConsts';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};
