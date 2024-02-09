import Search from "./Search";

interface SearchParamsType {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}

const MidSide = async ({ searchParams }: SearchParamsType) => {
  return (
    <div className="fl-center gap-4 flex-1 relative">
      <Search />
    </div>
  );
};

export default MidSide;
