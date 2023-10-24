// app/page.tsx
import { Card } from '@nextui-org/card';

export default async function Page() {
  return (
    <div className="max-w-[600px] mx-auto justify-center gap-[16px] py-[24px] p-[16px]">
      <Card className="w-[100%] md:p-[24px] p-[16px] flex flex-col" shadow="sm">
        <p className="text-2xl mb-[40px]">プライバシーポリシー</p>
        <p className="mb-[16px]">
          本サービスの利用に際してユーザーから収集される情報の取り扱いについて説明します。
          <br />
          ユーザーが本サービスを利用することで、以下の情報の収集・利用についてのポリシーを理解し、同意したものとみなします。
        </p>
        <p className="mb-[16px]">本サービスの一部はアカウントを作成せずに利用可能です。</p>
        <p className="mb-[16px]">
          ただし、アカウント作成を行う場合、ユーザーから一定の個人情報を収集する必要があります。
          <br />
          収集する情報にはユーザー名とメールアドレスが含まれます。
          <br />
          ユーザー名は公開情報として扱われますが、実名、仮名のいずれも選択することができます。
          <br />
          また、ユーザーは複数のアカウントを持つことが許可されています。
        </p>
        <p className="mb-[16px]">
          メールアドレスなどの連絡先情報は、ユーザーアカウントの認証、安全性の確保、およびスパムや詐欺行為からの保護を目的として利用されます。
        </p>
      </Card>
    </div>
  );
}
