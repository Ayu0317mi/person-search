//page.tsx
import { TechnicalOverview } from './components/technical-overview';
import { UserDialog } from './components/user-dialog';
import SearchInput from './components/search-input-cmd';

export default async function Home({}: { searchParams: Promise<{ userId?: string }> }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Search</h1>
      <SearchInput />
      <UserDialog />
      <TechnicalOverview />

    </div>
  );
}