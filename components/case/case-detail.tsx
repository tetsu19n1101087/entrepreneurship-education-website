import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Calendar, Clock, Users, Target } from 'lucide-react';
import { getCaseById } from '@/lib/supabase/cases';
import { createClient } from '@/lib/supabase/server';
import { LikesButton } from './likes';
import { notFound } from 'next/navigation';

export async function CaseDetail({ caseId }: { caseId: string }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const caseData = await getCaseById(caseId);

  if (!caseData) {
    notFound();
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-2'>
                <Badge
                  variant='outline'
                  className='border-blue-200 text-blue-700'
                >
                  {caseData.category}
                </Badge>
                <Badge variant='outline'>{caseData.subject}</Badge>
              </div>
              <CardTitle className='text-2xl mb-3'>{caseData.title}</CardTitle>
              <p className='text-muted-foreground text-lg'>
                {caseData.description}
              </p>
            </div>
          </div>

          <div className='flex items-center justify-between pt-4 border-t'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <Avatar className='w-10 h-10'>
                  <AvatarFallback>
                    {caseData.profiles?.display_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>
                    {caseData.profiles?.display_name}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {caseData.profiles?.school_name}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                <Calendar className='w-4 h-4' />
                {new Date(caseData.created_at).toLocaleDateString('ja-JP')}
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <LikesButton caseId={caseId} userId={user!.id} />
              <Button
                variant='outline'
                size='sm'
                className='gap-1 bg-transparent'
              >
                <MessageSquare className='w-4 h-4' />
                {caseData.comments_count}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Target className='w-5 h-5' />
            基本情報
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {caseData.target_grade && (
              <div className='flex items-center gap-2'>
                <Users className='w-4 h-4 text-muted-foreground' />
                <span className='text-sm font-medium'>対象学年:</span>
                <span className='text-sm'>{caseData.target_grade}</span>
              </div>
            )}
            {caseData.duration && (
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4 text-muted-foreground' />
                <span className='text-sm font-medium'>実施期間:</span>
                <span className='text-sm'>{caseData.duration}</span>
              </div>
            )}
          </div>

          {caseData.tags && caseData.tags.length > 0 && (
            <div>
              <p className='text-sm font-medium mb-2'>タグ:</p>
              <div className='flex flex-wrap gap-2'>
                {caseData.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant='secondary'>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Sections */}
      {caseData.objectives && (
        <Card>
          <CardHeader>
            <CardTitle>学習目標・ねらい</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='whitespace-pre-wrap'>{caseData.objectives}</p>
          </CardContent>
        </Card>
      )}

      {caseData.methods && (
        <Card>
          <CardHeader>
            <CardTitle>実施方法・活動内容</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='whitespace-pre-wrap'>{caseData.methods}</p>
          </CardContent>
        </Card>
      )}

      {caseData.materials && (
        <Card>
          <CardHeader>
            <CardTitle>使用教材・リソース</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='whitespace-pre-wrap'>{caseData.materials}</p>
          </CardContent>
        </Card>
      )}

      {caseData.evaluation && (
        <Card>
          <CardHeader>
            <CardTitle>評価方法・成果</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='whitespace-pre-wrap'>{caseData.evaluation}</p>
          </CardContent>
        </Card>
      )}

      {caseData.reflection && (
        <Card>
          <CardHeader>
            <CardTitle>振り返り・改善点</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='whitespace-pre-wrap'>{caseData.reflection}</p>
          </CardContent>
        </Card>
      )}

      {caseData.advice && (
        <Card>
          <CardHeader>
            <CardTitle>他の教員へのアドバイス</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='whitespace-pre-wrap'>{caseData.advice}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
