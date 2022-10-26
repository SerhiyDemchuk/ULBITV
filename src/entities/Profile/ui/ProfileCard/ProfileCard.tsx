import cls from './ProfileCard.module.scss';
import { Input } from 'shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Profile } from '../../model/types/profile';
import { Loader } from 'shared/ui/Loader/ui/Loader';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Select } from 'shared/ui/Select/Select';
import { Currency } from 'entities/Currency/model/types/currency';
import { CurrencySelect } from 'entities/Currency/ui/CurrencySelect/CurrencySelect';
import { Country, CountrySelect } from 'entities/Country';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  onChangeLastname?: (value?: string) => void;
  onChangeFirstname?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  readonly?: boolean;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    data,
    error,
    readonly,
    isLoading,
    className,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeCountry,
    onChangeCurrency,
    onChangeUsername,
    onChangeLastname,
    onChangeFirstname,
  } = props;
  const { t } = useTranslation('profile');

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
          title={t('An error occurred')}
          text={t('Try to reload page')}
        />
      </div>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      {data?.avatar && (
        <div className={cls.avatarWrapper}>
          <Avatar src={data?.avatar} />
        </div>
      )}
      <Input
        readonly={readonly}
        className={cls.input}
        value={data?.firstname}
        onChange={onChangeFirstname}
        placeholder={t('Your name')}
      />
      <Input
        readonly={readonly}
        className={cls.input}
        value={data?.lastname}
        onChange={onChangeLastname}
        placeholder={t('Your surname')}
      />
      <Input
        value={data?.age}
        readonly={readonly}
        className={cls.input}
        onChange={onChangeAge}
        placeholder={t('Your age')}
      />
      <Input
        value={data?.city}
        readonly={readonly}
        className={cls.input}
        onChange={onChangeCity}
        placeholder={t('City')}
      />
      <Input
        readonly={readonly}
        className={cls.input}
        value={data?.username}
        onChange={onChangeUsername}
        placeholder={t('Username')}
      />
      <Input
        readonly={readonly}
        value={data?.avatar}
        className={cls.input}
        onChange={onChangeAvatar}
        placeholder={t('Link to avatar')}
      />
      <CurrencySelect
        readonly={readonly}
        className={cls.input}
        value={data?.currency}
        onChange={onChangeCurrency}
      />
      <CountrySelect
        readonly={readonly}
        className={cls.input}
        value={data?.country}
        onChange={onChangeCountry}
      />
    </div>
  );
};
