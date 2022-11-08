import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Input } from 'shared/ui/Input/Input';
import cls from './AddCommentForm.module.scss';
import { useTranslation } from 'react-i18next';
import {
  getAddCommentFormText,
  getAddCommentFormError,
} from '../model/selectors/addCommentFormSelectors';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { addCommentFormActions, addCommentFormReducer } from '../model/slices/addCommentFormSlice';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo(({ className, onSendComment }: AddCommentFormProps) => {
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, [dispatch]);

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input
          value={text}
          className={cls.input}
          onChange={onCommentTextChange}
          placeholder={t('Type comment text')}
        />
        <Button
          onClick={onSendHandler}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Send')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
