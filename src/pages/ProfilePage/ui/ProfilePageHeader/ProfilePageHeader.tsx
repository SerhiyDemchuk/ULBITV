import {
  getProfileData,
  profileActions,
  updateProfileData,
  getProfileReadonly,
} from 'entities/Profile';
import { useCallback } from 'react';
import { HStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { getUserAuthData } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const {
    className,
  } = props;
  const { t } = useTranslation('profile');
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSaveEdit = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <HStack
      max
      justify="between"
      className={classNames('', {}, [className])}
    >
      <Text title={t('Profile')} />
      {canEdit && (
        <div>
          {readonly ? (
            <Button
              onClick={onEdit}
              theme={ButtonTheme.OUTLINE}
            >
              {t('Edit')}
            </Button>
          ) : (
            <HStack gap="8">
              <Button
                onClick={onCancelEdit}
                theme={ButtonTheme.OUTLINE_RED}
              >
                {t('Cancel')}
              </Button>
              <Button
                onClick={onSaveEdit}
                theme={ButtonTheme.OUTLINE}
              >
                {t('Save')}
              </Button>
            </HStack>
          )}
        </div>
      )}
    </HStack>
  );
};
