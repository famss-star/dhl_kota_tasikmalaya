import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const [
      totalArticles,
      totalNews,
      totalUsers,
      publishedArticles,
      publishedNews,
      recentArticles,
      recentNews
    ] = await Promise.all([
      prisma.article.count(),
      prisma.news.count(),
      prisma.user.count(),
      prisma.article.count({ where: { isPublished: true } }),
      prisma.news.count({ where: { isPublished: true } }),
      prisma.article.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { name: true }
          },
          category: {
            select: { name: true }
          }
        }
      }),
      prisma.news.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { name: true }
          }
        }
      })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        counts: {
          totalArticles,
          totalNews,
          totalUsers,
          publishedArticles,
          publishedNews
        },
        recent: {
          articles: recentArticles,
          news: recentNews
        }
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch dashboard statistics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
