import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserAvatar } from '@/components/user-avatar';
import { getCaseById } from '@/lib/supabase/cases';
import { createClient } from '@/lib/supabase/server';
import { Calendar, Clock, FileText, Info, PenTool, Users } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CaseLikesButton } from './likes-button';

export async function CaseDetail({ caseId }: { caseId: string }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const caseData = await getCaseById(caseId);

  if (!caseData) {
    notFound();
  }

  const resolvedHeaderImageUrl = caseData.header_image_url
    ? caseData.header_image_url.startsWith('/') ||
      caseData.header_image_url.startsWith('http://') ||
      caseData.header_image_url.startsWith('https://')
      ? caseData.header_image_url
      : supabase.storage.from('images').getPublicUrl(caseData.header_image_url)
          .data.publicUrl
    : null;

  return (
    <div className='space-y-space-24'>
      {resolvedHeaderImageUrl && (
        <div className='relative h-64 w-full overflow-hidden rounded-md'>
          <Image
            src={resolvedHeaderImageUrl}
            alt={`${caseData.title}のヘッダー画像`}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'
            priority
          />
        </div>
      )}

      <Card>
        <CardHeader>
          <div className='flex items-start justify-between gap-space-16'>
            <div className='flex-1'>
              <div className='mb-space-8 flex items-center gap-space-8'>
                <Badge variant='outline'>{caseData.subject}</Badge>
              </div>
              <CardTitle className='mb-space-16 text-heading-xl'>
                {caseData.title}
              </CardTitle>
              <p className='text-body-md text-muted-foreground'>
                {caseData.description}
              </p>
            </div>
          </div>

          <div className='flex items-center justify-between border-t pt-space-16'>
            <div className='flex items-center gap-space-16'>
              <div className='flex items-center gap-space-8'>
                <UserAvatar
                  src={caseData.profiles?.avatar_url}
                  name={caseData.profiles?.display_name}
                  size={40}
                />
                <div>
                  <p className='text-heading-md'>
                    {caseData.profiles?.display_name}
                  </p>
                  <p className='text-body-sm text-muted-foreground'>
                    {caseData.profiles?.school_name}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-space-4 font-en text-meta-sm text-muted-foreground'>
                <Calendar className='h-4 w-4' />
                {new Date(caseData.created_at).toLocaleDateString('ja-JP')}
              </div>
            </div>

            <div className='flex items-center gap-space-8'>
              <CaseLikesButton caseId={caseId} userId={user?.id} />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-space-8'>
            <Info className='h-5 w-5' />
            基本情報
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-space-16'>
          <div className='grid grid-cols-1 gap-space-16 md:grid-cols-3'>
            {caseData.grade_level && (
              <div className='flex items-center gap-space-8'>
                <Users className='h-4 w-4 text-muted-foreground' />
                <span className='text-label-md'>対象学年:</span>
                <span className='text-body-sm'>{caseData.grade_level}</span>
              </div>
            )}
            {caseData.duration && (
              <div className='flex items-center gap-space-8'>
                <Clock className='h-4 w-4 text-muted-foreground' />
                <span className='text-label-md'>実施期間:</span>
                <span className='text-body-sm'>{caseData.duration}</span>
              </div>
            )}
          </div>

          {caseData.tags && caseData.tags.length > 0 && (
            <div>
              <p className='mb-space-8 text-label-md'>タグ:</p>
              <div className='flex flex-wrap gap-space-8'>
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

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-space-8'>
            <FileText className='h-5 w-5' />
            詳細
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='whitespace-pre-wrap'>{caseData.content}</p>
        </CardContent>
      </Card>

      {caseData.materials && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-space-8'>
              <PenTool className='h-5 w-5' />
              使用教材・リソース
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='whitespace-pre-wrap'>{caseData.materials}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
