import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

function TableSkeleton() {
  const repeatedContent = Array.from({ length: 10 }, () => (
    <>
      <div className="flex justify-between">
        <Skeleton className="m-5 h-6 w-44" />
        <Skeleton className="m-5 h-6 w-44" />
        <Skeleton className="m-5 h-6 w-44" />
        <Skeleton className="m-5 h-6 w-44" />
        <Skeleton className="m-5 h-6 w-44" />
      </div>
      <Separator />
    </>
  ));

  return (
    <div>
      <Skeleton className="my-4 h-8 w-80" />
      <Card>
        <div className="flex justify-between">
          <Skeleton className="m-4 h-6 w-44" />
          <Skeleton className="m-4 h-6 w-44" />
          <Skeleton className="m-4 h-6 w-44" />
          <Skeleton className="m-4 h-6 w-44" />
          <Skeleton className="m-4 h-6 w-44" />
        </div>
        <Separator />
        {repeatedContent}
        <div className="flex justify-between">
          <Skeleton className="m-4 h-8 w-36" />
          <Skeleton className="m-4 h-6 w-24" />
          <Skeleton className="m-4 h-8 w-36" />
        </div>
      </Card>
    </div>
  );
}
export default TableSkeleton;
