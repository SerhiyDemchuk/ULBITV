import cls from './ProfileCard.module.scss';
import { Input } from 'shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { HStack, VStack } from 'shared/ui/Stack';
import { Profile } from '../../model/types/profile';
import { Loader } from 'shared/ui/Loader/ui/Loader';
import { Country, CountrySelect } from 'entities/Country';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Currency } from 'entities/Currency/model/types/currency';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { CurrencySelect } from 'entities/Currency/ui/CurrencySelect/CurrencySelect';

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
      <HStack
        justify="center"
        className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}
      >
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack
        max
        justify="center"
        className={classNames(cls.ProfileCard, {}, [className, cls.error])}
      >
        <Text
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
          title={t('An error occurred')}
          text={t('Try to reload page')}
        />
      </HStack>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack
      max
      gap="8"
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack
          max
          justify="center"
          className={cls.avatarWrapper}
        >
          <Avatar src={data?.avatar} />
        </HStack>
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
        value={data?.lastname}
        onChange={onChangeLastname}
        placeholder={t('Your surname')}
      />
      <Input
        value={data?.age}
        readonly={readonly}
        onChange={onChangeAge}
        placeholder={t('Your age')}
      />
      <Input
        value={data?.city}
        readonly={readonly}
        onChange={onChangeCity}
        placeholder={t('City')}
      />
      <Input
        readonly={readonly}
        value={data?.username}
        onChange={onChangeUsername}
        placeholder={t('Username')}
      />
      <Input
        readonly={readonly}
        value={data?.avatar}
        onChange={onChangeAvatar}
        placeholder={t('Link to avatar')}
      />
      <CurrencySelect
        readonly={readonly}
        value={data?.currency}
        onChange={onChangeCurrency}
      />
      <CountrySelect
        readonly={readonly}
        value={data?.country}
        onChange={onChangeCountry}
      />
    </VStack>
  );
};
