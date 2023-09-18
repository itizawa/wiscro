import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useTitleInput } from './hooks/useTitleInput';
import { useDescriptionInput } from './hooks/useDescriptionInput';
import { usePostQuestion } from '~/hooks/Question/usePostQuestion';
import { URLS } from '~/constants/urls';

export const CreateQuestionCard: FC = () => {
  const { value: title, changeValue: changeTitle, isError: isErrorTitle } = useTitleInput();
  const { value: description, changeValue: changeDescription, isError: isErrorDescription } = useDescriptionInput();

  const [isLoading, setIsLoading] = useState(false);
  const { postQuestion } = usePostQuestion();
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    await postQuestion({ title, description })
      .then((question) => {
        router.push(URLS.QUESTION_DETAIL(question._id));
      })
      .finally(() => setIsLoading(false));
  }, [postQuestion, title, description, router]);

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
        disabled={isLoading || isErrorTitle || isErrorDescription}
      >
        作成
      </button>
    </div>
  );
};
