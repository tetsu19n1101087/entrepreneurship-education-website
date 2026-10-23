import { TeacherProfileCard } from '@/components/teacher-profile-card';
import { getProfiles } from '@/lib/supabase/profiles';

export default async function TeachersPage() {
  const profiles = await getProfiles();

  // map profiles table shape to the TeacherProfileCard expected shape
  const teachers = profiles.map((p) => ({
    id: p.id,
    name: p.display_name,
    avatarUrl: p.avatar_url ?? null,
    school: p.school_name,
    schoolType:
      p.school_type === 'elementary'
        ? '小学校'
        : p.school_type === 'junior_high'
          ? '中学校'
          : p.school_type === 'high_school'
            ? '高等学校'
            : 'その他',
    position: p.subject ?? '',
    postsCount: 0, // keep default until we wire posts count
    followersCount: 0, // default; follower system not yet implemented
    isFollowing: false,
  }));

  return (
    <div className='h-full flex-1 bg-background'>
      <main className='container mx-auto px-space-16 py-space-32'>
        <div className='mb-space-32'>
          <h1 className='mb-space-8 text-heading-xl text-foreground'>
            教員一覧
          </h1>
          <p className='text-body-md text-muted-foreground'>
            千葉県内の教員の皆様とつながりましょう
          </p>
        </div>
        <div className='grid grid-cols-1 gap-space-24 md:grid-cols-2 lg:grid-cols-3'>
          {teachers.map((teacher) => (
            <TeacherProfileCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </main>
    </div>
  );
}
