import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '~/libs/mongoClient';

type ClientType = {
  clientId: string;
  clientSecret: string;
};

// Auth.js設定値の作成
export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // ここに記載したプロバイダがログイン画面で自動実装される
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ClientType),
  ],
  // シークレットキー
  secret: process.env.NEXTAUTH_SECRET,

  // セッション方式の設定
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 24 hours
  },

  callbacks: {
    // リダイレクト時の動作を設定
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    // セッションの設定
    async session(log) {
      console.log(35, log);

      // if (session?.user) session.user.id = user.id;
      return log.session;
    },
  },
};

// NextAuthのハンドラーを作成
const handler = NextAuth(authOptions);

// 公開
export { handler as GET, handler as POST };
