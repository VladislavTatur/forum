import { useState, type ChangeEvent } from 'react';

import { Input } from '@mui/material';

type EditableSpanProps = {
  title: string;
  changeTitle: (newTitle: string) => void;
};
export const EditableSpan = ({ title, changeTitle }: EditableSpanProps) => {
  const [editMode, setEditMode] = useState(false);
  const [itemTitle, setItemTitle] = useState(title);

  const onEditMode = () => setEditMode(true);
  const offEditMode = () => {
    changeTitle(itemTitle);
    setEditMode(false);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value);
  };

  return (
    <>
      {editMode ? (
        <Input value={itemTitle} autoFocus onBlur={offEditMode} onChange={onChangeHandler}></Input>
      ) : (
        <span onDoubleClick={onEditMode}>{itemTitle}</span>
      )}
    </>
  );
};
