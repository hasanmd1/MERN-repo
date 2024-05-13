import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";

type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
}

const PaginationSelector = ({page, pages, onPageChange}: Props) => {
    const pageNumbers = [];

    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    return (
        <Pagination>
            <PaginationContent>
                {page !== 1 && (
                    <PaginationItem key={`prev`}>
                        <PaginationPrevious
                            href={`#`}
                            onClick={() => onPageChange(page - 1)}
                        />
                    </PaginationItem>
                )}

                {pageNumbers.map((pageNumber) => (
                    <PaginationItem key={`page_${pageNumber}`}>
                        <PaginationLink
                            isActive={page === pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            href={`#`}
                        >

                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {page !== pageNumbers.length && (
                    <PaginationItem key={`next`}>
                        <PaginationNext
                            href={`#`}
                            onClick={() => onPageChange(page + 1)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationSelector;