/* //user-search.tsx
//"use client";
import SearchInput from './search-input-cmd';


export default function UserSearch({ searchParams }: { searchParams: Promise<{ userId?: string }> }) {
  // Resolve the searchParams asynchronously
  //const resolvedSearchParams = use(searchParams);
  //const selectedUserId = resolvedSearchParams?.userId || null;
  
  // Fetch user details when selectedUserId changes
  useEffect(() => {
    if (selectedUserId) {
      getUserById(selectedUserId);
    }
  }, [selectedUserId]);

  return (
    <div className="space-y-6">
      <SearchInput />
    </div>
  );
} */