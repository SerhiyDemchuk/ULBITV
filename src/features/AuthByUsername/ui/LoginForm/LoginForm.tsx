import cls from './LoginForm.module.scss';
import { Input } from 'shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames/classNames';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input className={cls.input} placeholder={t('Type username')} autofocus />
      <Input className={cls.input} placeholder={t('Type password')} />
      <Button className={cls.loginBtn}>
        {t('Log in')}
      </Button>
    </div>
  );
};
