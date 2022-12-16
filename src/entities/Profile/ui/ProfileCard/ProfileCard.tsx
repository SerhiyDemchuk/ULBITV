import { Profile } from '../../../Profile';
import cls from './ProfileCard.module.scss';
import { Input } from '@/shared/ui/Input';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/shared/ui/Avatar';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/Loader';
import { Country, CountrySelect } from '@/entities/Country';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text';
import { Currency } from '@/entities/Currency/model/types/currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { CurrencySelect } from '@/entities/Currency/ui/CurrencySelect/CurrencySelect';

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
        max
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
        data-testid="ProfileCard.FirstName"
      />
      <Input
        readonly={readonly}
        value={data?.lastname}
        onChange={onChangeLastname}
        placeholder={t('Your surname')}
        data-testid="ProfileCard.LastName"
      />
      <Input
        value={data?.age}
        readonly={readonly}
        onChange={onChangeAge}
        placeholder={t('Your age')}
        data-testid="ProfileCard.Age"
      />
      <Input
        value={data?.city}
        readonly={readonly}
        onChange={onChangeCity}
        placeholder={t('City')}
        data-testid="ProfileCard.City"
      />
      <Input
        readonly={readonly}
        value={data?.username}
        onChange={onChangeUsername}
        placeholder={t('Username')}
        data-testid="ProfileCard.Username"
      />
      <Input
        readonly={readonly}
        value={data?.avatar}
        onChange={onChangeAvatar}
        placeholder={t('Link to avatar')}
        data-testid="ProfileCard.Avatar"
      />
      <CurrencySelect
        readonly={readonly}
        value={data?.currency}
        onChange={onChangeCurrency}
        data-testid="ProfileCard.Currency"
      />
      <CountrySelect
        readonly={readonly}
        value={data?.country}
        onChange={onChangeCountry}
        data-testid="ProfileCard.Country"
      />
    </VStack>
  );
};
