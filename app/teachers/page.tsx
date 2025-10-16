import { TeacherProfileCard } from '@/components/teacher-profile-card';
import { SearchFilterProvider } from '@/hooks/use-search-filter';
import { getProfiles } from '@/lib/supabase/profiles';

export default async function TeachersPage() {
  const profiles = await getProfiles();

  // map profiles table shape to the TeacherProfileCard expected shape
  const teachers = profiles.map((p) => ({
    id: p.id,
    name: p.display_name,
    school: p.school_name,
    schoolType:
      p.school_type === 'elementary'
        ? '小学校'
        : p.school_type === 'junior_high'
        ? '中学校'
        : '高等学校',
    position: p.subject ?? '',
    postsCount: 0, // keep default until we wire posts count
    followersCount: 0, // default; follower system not yet implemented
    isFollowing: false,
  }));

  return (
    <SearchFilterProvider>
      <div className='min-h-screen bg-background'>
        <main className='container mx-auto px-4 py-8'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-foreground mb-2'>
              教員一覧
            </h1>
            <p className='text-muted-foreground text-lg'>
              千葉県内の教員の皆様とつながりましょう
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {teachers.map((teacher) => (
              <TeacherProfileCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </main>
      </div>
    </SearchFilterProvider>
  );
}
