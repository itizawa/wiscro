import type { NextPage } from 'next';
import { useCallback } from 'react';

const NextPage: NextPage = () => {
  const handleSubmit = useCallback(() => {
    console.log('push');
  }, []);

  return (
    <div className="py-3">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="card py-4 px-5" style={{ width: '100%', maxWidth: '500px' }}>
          <h1 className="text-center">質問を作成する</h1>
          <div className="d-flex flex-column gap-3 mt-5">
            <div>
              <label htmlFor="exampleFormControlInput1" className="form-label">
                タイトル <span className="text-danger">※</span>
              </label>
              <input type="email" className="form-control" id="exampleFormControlInput1" />
            </div>
            <div>
              <label htmlFor="exampleFormControlTextarea1" className="form-label">
                説明
              </label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} />
            </div>
          </div>
          <button type="button" className="btn btn-md btn-primary text-white mt-5" onClick={handleSubmit}>
            作成
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextPage;
