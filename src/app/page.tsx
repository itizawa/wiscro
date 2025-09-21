import { ProductCard } from "@/components/ProductCard";
import ScrollHandler from "@/components/ScrollHandler";
import { BlogList } from "@/components/blog/BlogList";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/button";
import { getAllBlogPosts } from "@/shared/lib/blog";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const recentPosts = getAllBlogPosts().slice(0, 3);
  return (
    <main
      className="min-h-screen flex flex-col items-center "
      style={{
        backgroundImage: `linear-gradient(45deg, rgb(139 208 254 / 30%), rgba(0, 123, 255, 0))`,
      }}
    >
      <ScrollHandler />
      <section className="h-[224px] md:h-[600px] relative">
        <div className="max-w-6xl mx-auto">
          <div className="hidden md:block absolute bottom-8 left-8 p-6 md:p-8 bg-[rgba(255,255,255,0.8)] rounded-lg shadow-lg text-[#2F4A7B]">
            <div className="flex flex-col space-y-4">
              <span className="md:text-4xl font-bold">
                WEBの力で事業を前に進める
              </span>
              <span className="md:text-2xl font-bold">
                顧客に寄り添う地域密着型のシステム屋さん
              </span>
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/eye-catch.png"
          alt="wiscro"
          className="h-[224px] md:h-[600px] object-cover w-screen object-top"
        />
      </section>
      <div className="block md:hidden py-6 px-4 text-[#2F4A7B]">
        <div className="flex flex-col space-y-4">
          <span className="font-bold">WEBの力で事業を前に進める</span>
          <span className="text-sm font-bold">
            顧客に寄り添う地域密着型のシステム屋さん
          </span>
        </div>
      </div>
      {/* Representative Introduction */}
      <section
        className="py-6 md:py-12 px-4 md:px-8 max-w-6xl mx-auto"
        id="representative"
      >
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">代表紹介</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <Image
              src="/icon.jpg"
              alt="市澤 樹享"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">市澤 樹享</h3>
            <p className="md:text-base">
              LINE公式アカウントを活用した採用管理システムを提供する急成長スタートアップにて、
              <br />
              アプリケーションエンジニアとしてプロダクトの立ち上げから携わっています。
              <br />
              <br />
              特に0→1フェーズにおける技術選定、フロントエンドエコシステムの構築、パフォーマンス改善、SRE領域まで幅広く対応可能で、
              <br />
              専門性が求められる領域において強みを発揮しています。
            </p>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section
        className="py-6 md:py-12 px-4 md:px-8 max-w-6xl mx-auto"
        id="services"
      >
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b">提供サービス</h2>
        <p className="mb-6 text-gray-600">
          お客様のビジネス課題に寄り添い、最適なソリューションを提供いたします。
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ServiceCard
            title="ホームページ制作"
            summary="あなたの想いを形にする、お客様を呼び込むホームページ作り"
            description={
              "まずはあなたのお仕事やサービスについてお話を聞かせてください。理想のお客様像や伝えたい魅力を一緒に考えながら、集客や売上アップにつながるホームページを作ります。"
            }
            features={[
              "同業他社の調査とマーケットの分析",
              "ターゲットとなるお客様の設計",
              "検索で見つけてもらいやすい構成づくり",
              "パソコンでもスマホでも見やすいデザイン",
              "ご自分で簡単に更新できる仕組み",
              "アクセス数の分析サポート",
              "公開後のメンテナンスとサポート",
            ]}
          />
          <ServiceCard
            title="業務システム開発"
            summary="日々の業務をラクにする、オーダーメイドシステム作り"
            description="大変な作業や時間のかかる部分を一緒に見つけて、あなたの会社にぴったりのシステムを作ります。ただのツールではなく、毎日の業務が楽になるようサポートします。"
            features={[
              "お仕事の流れを整理し、困りごとを見つけるお手伝い",
              "必要なシステムを一緒に考える",
              "使いやすい画面とデザインの作成",
              "データを安全に管理する仕組み作り",
              "お使いのシステムとの連携",
              "完成後のサポート体制の整備",
              "操作方法の研修とマニュアル作成",
            ]}
          />
          <ServiceCard
            title="IT活用支援"
            summary="デジタルを味方につけて、お仕事をもっと効率的に"
            description="「IT活用って何から始めたらいいの？」そんな疑問にお答えします。今のお仕事でデジタルツールを使うメリットや効果的な始め方を分かりやすくご説明し、一歩ずつサポートします。"
            features={[
              "今のお仕事でのIT活用状況を確認",
              "デジタル化で何ができるか戦略づくり",
              "アナログ作業をデジタルに変える提案",
              "クラウドサービスの導入サポート",
              "データを活用した分析の仕組みづくり",
              "スタッフ向けのIT研修",
              "IT活用を進める体制づくりのお手伝い",
              "効果の測定と改善のサポート",
            ]}
          />
        </div>
      </section>
      {/* Blog Section */}
      <section
        className="py-6 md:py-12 px-4 md:px-8 max-w-6xl mx-auto  w-full"
        id="blogs"
      >
        <div className="flex justify-between items-center mb-6 border-b">
          <h2 className="text-2xl font-bold pb-2 ">最新のコンテンツ</h2>
          <Link
            href="/blog"
            className="text-blue-700 hover:text-blue-800 font-medium"
          >
            すべて見る →
          </Link>
        </div>
        <p className="mb-6 text-gray-600">
          技術情報や企業活動について発信しています。
        </p>
        <BlogList posts={recentPosts} />
      </section>
      {/* Services Section */}
      <section
        className="py-6 md:py-12 px-4 md:px-8 max-w-6xl mx-auto"
        id="products"
      >
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b">
          プロダクト一覧
        </h2>
        <p className="mb-6 text-gray-600">
          企画・開発・運用までを一貫して開発しています。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProductCard
            icon={"/thread-note.png"}
            url="https://www.thread-note.com"
            title="Thread Note"
            summary="Thread Note はスレッド形式で手軽に情報を残すことができるサービスです。"
          />
          <ProductCard
            icon={"/lucky-bag.png"}
            url="https://news.wiscro.app"
            title="福袋速報"
            summary="福袋の情報をまとめて紹介するサイト。LINE公式アカウントを通じて最新情報を配信しています。"
          />
        </div>
      </section>
      {/* Development Achievements */}
      <section
        className="py-6 md:py-12 px-4 md:px-8 max-w-6xl mx-auto"
        id="achievements"
      >
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b">開発実績</h2>
        <p className="mb-6 text-gray-600">これまでの開発実績を紹介します。</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg overflow-hidden bg-gray-50">
            <div className="h-48 bg-emerald-100 relative">
              <Image
                src="/design.png"
                alt="アート管理のSaaSプロダクト"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">アート管理のSaaSプロダクト</h3>
              <p className="text-sm text-gray-600">
                アート管理業者が販売活動を行うためのECサイトのデザイン改修のリードエンジニアを担当。
              </p>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden bg-gray-50">
            <div className="h-48 bg-amber-100 relative">
              <Image
                src="/fc.png"
                alt="複業マッチングプラットフォーム"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">複業マッチングプラットフォーム</h3>
              <p className="text-sm text-gray-600">
                詳細設計から実装までのシステム開発を担当
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="py-6 md:py-12 px-4 md:px-8 w-full max-w-6xl mx-auto"
        id="company-overview"
      >
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b">概要</h2>
        <div className="bg-white rounded-lg p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <th className="py-4 pr-4 text-left w-1/4 text-gray-600">
                    団体名
                  </th>
                  <td className="py-4">wiscro（ウィズクロ）</td>
                </tr>
                <tr className="border-b">
                  <th className="py-4 pr-4 text-left w-1/4 text-gray-600">
                    代表者
                  </th>
                  <td className="py-4">市澤 樹享</td>
                </tr>
                <tr className="border-b">
                  <th className="py-4 pr-4 text-left w-1/4 text-gray-600">
                    設立
                  </th>
                  <td className="py-4">2023年5月18日</td>
                </tr>
                <tr className="border-b">
                  <th className="py-4 pr-4 text-left w-1/4 text-gray-600">
                    所在地
                  </th>
                  <td className="py-4">埼玉県深谷市</td>
                </tr>
                <tr>
                  <th className="py-4 pr-4 text-left w-1/4 text-gray-600">
                    事業内容
                  </th>
                  <td className="py-4">
                    企業向け業務ソフトウェア・Webサービス開発
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-6 md:py-12 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">お問い合わせ</h2>
        <p className="mb-8">
          ご相談・お見積もりなど、お気軽にお問い合わせください。
        </p>
        <div className="flex justify-center items-center gap-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeNmuXo7-05iU_m5ge4pq_1pysVTqcis8JWOgrupso1foOZpw/viewform?usp=dialogo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-2 rounded">
              お問い合わせ
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}
