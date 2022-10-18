import cls from './LoginForm.module.scss';
import { memo, useCallback } from 'react';
import { Input } from 'shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

export interface LoginFormProps {
  className?: string;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={initialReducers}
    >
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('Authorisation form')} />
        {error && <Text text={t('Wrong login or password')} theme={TextTheme.ERROR} />}
        <Input
          autofocus
          type="text"
          value={username}
          className={cls.input}
          onChange={onChangeUsername}
          placeholder={t('Type username')}
        />
        <Input
          type="text"
          value={password}
          className={cls.input}
          onChange={onChangePassword}
          placeholder={t('Type password')}
        />
        <Button
          disabled={isLoading}
          onClick={onLoginClick}
          className={cls.loginBtn}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Log in')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
