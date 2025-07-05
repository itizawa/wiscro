import { NextRequest, NextResponse } from 'next/server';
import { Client, MiddlewareConfig, WebhookEvent, MessageEvent, TextEventMessage, TemplateMessage } from '@line/bot-sdk';
import { getAllBlogPosts } from '@/shared/lib/blog';
import { BlogPost } from '@/shared/types/blog';

const client = new Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN as string,
  channelSecret: process.env.LINE_CHANNEL_SECRET as string,
});

function createCarouselTemplate(posts: BlogPost[]): TemplateMessage {
  const columns = posts.slice(0, 5).map(post => ({
    thumbnailImageUrl: post.thumbnail || 'https://www.wiscro.app/default-thumbnail.jpg',
    title: post.title.length > 40 ? post.title.substring(0, 37) + '...' : post.title,
    text: post.summary.length > 60 ? post.summary.substring(0, 57) + '...' : post.summary,
    actions: [
      {
        type: 'uri' as const,
        label: '記事を読む',
        uri: `https://www.wiscro.app/blog/${post.slug}`
      }
    ]
  }));

  // 「もっと見る」カードを追加
  columns.push({
    thumbnailImageUrl: 'https://www.wiscro.app/more-articles.jpg',
    title: 'もっと見る',
    text: '他の記事もチェックしてみてください',
    actions: [
      {
        type: 'uri' as const,
        label: '全記事を見る',
        uri: 'https://www.wiscro.app/blog'
      }
    ]
  });

  return {
    type: 'template',
    altText: '最新記事一覧',
    template: {
      type: 'carousel',
      columns
    }
  };
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const events: WebhookEvent[] = body.events;

    for (const event of events) {
      if (event.type === 'message' && event.message.type === 'text') {
        const messageEvent = event as MessageEvent;
        const message = messageEvent.message as TextEventMessage;
        const messageText = message.text?.trim();

        if (messageText === '【最新コンテンツ】') {
          // 最新のブログ記事を取得
          const posts = getAllBlogPosts();

          // カルーセルテンプレートで返信
          const carouselMessage = createCarouselTemplate(posts);
          await client.replyMessage(messageEvent.replyToken, carouselMessage);
        }
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
