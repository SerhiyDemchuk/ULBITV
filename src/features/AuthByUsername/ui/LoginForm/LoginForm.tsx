import { memo, useCallback } from 'react';
import cls from './LoginForm.module.scss';
import { Input } from 'shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../../model/slice/loginSlice';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    username, password, error, isLoading,
  } = useSelector(getLoginState);

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
  );
});
