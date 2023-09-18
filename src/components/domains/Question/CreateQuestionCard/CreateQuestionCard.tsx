import { FC, useCallback } from 'react';
import { useTitleInput } from './hooks/useTitleInput';
import { useDescriptionInput } from './hooks/useDescriptionInput';

export const CreateQuestionCard: FC = () => {
  const { value: title, changeValue: changeTitle, isError: isErrorTitle } = useTitleInput();
  const { value: description, changeValue: changeDescription, isError: isErrorDescription } = useDescriptionInput();

  const handleSubmit = useCallback(() => {
    console.log(title, description);
  }, [title, description]);

  return (
    <div className="card py-4 px-5" style={{ width: '100%', maxWidth: '500px' }}>
      <h1 className="text-center">質問を作成する</h1>
      <div className="d-flex flex-column gap-3 mt-5">
        <div>
          <label htmlFor="exampleFormControlInput1" className="form-label">
            タイトル <span className="text-danger">※</span>
          </label>
          <input onChange={(e) => changeTitle(e.target.value)} className="form-control" id="exampleFormControlInput1" />
        </div>
        <div>
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            説明
          </label>
          <textarea onChange={(e) => changeDescription(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows={3} />
        </div>
      </div>
      <button
        type="button"
        className="btn btn-md btn-primary text-white mt-5"
        onClick={handleSubmit}
        disabled={isErrorTitle || isErrorDescription}
      >
        作成
      </button>
    </div>
  );
};
