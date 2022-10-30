import {
  ProfileCard,
  profileActions,
  profileReducer,
  getProfileForm,
  getProfileError,
  fetchProfileData,
  getProfileReadonly,
  getProfileIsLoading,
  getProfileValidateErrors,
} from 'entities/Profile';
import { useSelector } from 'react-redux';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ValidateProfileError } from 'entities/Profile/model/types/profile';
import { ProfilePageHeader } from 'pages/ProfilePage/ui/ProfilePageHeader/ProfilePageHeader';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

interface ProfilePageProps {
  className?: string;
}

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const error = useSelector(getProfileError);
  const formData = useSelector(getProfileForm);
  const readonly = useSelector(getProfileReadonly);
  const isLoading = useSelector(getProfileIsLoading);
  const validateErrors = useSelector(getProfileValidateErrors);

  const validateErrorTranslates = {
    [ValidateProfileError.NO_DATA]: t('Дані не вказано'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некоректний вік'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некоректний регіон'),
    [ValidateProfileError.SERVER_ERROR]: t('Серверна помилка при зберіганні'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Ім\'я та прізвище обов\'зково'),
  };

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchProfileData());
    }
  }, [dispatch]);

  const onChangeFirstname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ firstname: value || '' }));
  }, [dispatch]);

  const onChangeLastname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ lastname: value || '' }));
  }, [dispatch]);

  const onChangeAge = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
  }, [dispatch]);

  const onChangeCity = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ city: value || '' }));
  }, [dispatch]);

  const onChangeUsername = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ username: value || '' }));
  }, [dispatch]);

  const onChangeAvatar = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ avatar: value || '' }));
  }, [dispatch]);

  const onChangeCurrency = useCallback((currency?: Currency) => {
    dispatch(profileActions.updateProfile({ currency }));
  }, [dispatch]);

  const onChangeCountry = useCallback((country?: Country) => {
    dispatch(profileActions.updateProfile({ country }));
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader />
        {validateErrors?.length && validateErrors.map((err) => (
          <Text
            key={err}
            theme={TextTheme.ERROR}
            text={validateErrorTranslates[err]}
          />
        ))}
        <ProfileCard
          error={error}
          data={formData}
          readonly={readonly}
          isLoading={isLoading}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeAvatar={onChangeAvatar}
          onChangeCountry={onChangeCountry}
          onChangeCurrency={onChangeCurrency}
          onChangeUsername={onChangeUsername}
          onChangeLastname={onChangeLastname}
          onChangeFirstname={onChangeFirstname}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
