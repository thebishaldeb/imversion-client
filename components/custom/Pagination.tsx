import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogsListProps {
  limit: number;
  offset: number;
  totalCount: number;
  hasNextPage: boolean;
  url: string;
  className?: string;
}
export function PaginationComponent({
  totalCount,
  limit,
  offset,
  hasNextPage,
  url,
  className = "",
}: BlogsListProps) {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem style={offset <= 0 ? { cursor: "not-allowed" } : {}}>
          <PaginationPrevious
            disabled={offset <= 0}
            href={`${url}limit=${limit}&offset=${offset - limit}`}
          />
        </PaginationItem>
        <PaginationItem>
          <p className="text-foreground">
            Page {Math.ceil(offset / limit) + 1} of{" "}
            {Math.ceil(totalCount / limit)}
          </p>
        </PaginationItem>
        <PaginationItem style={!hasNextPage ? { cursor: "not-allowed" } : {}}>
          <PaginationNext
            disabled={!hasNextPage}
            href={`${url}limit=${limit}&offset=${offset + limit}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
