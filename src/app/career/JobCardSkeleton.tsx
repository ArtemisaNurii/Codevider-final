import { Skeleton } from "@/components/ui/skeleton"

const cardShadow =
  "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]"

export default function JobCardSkeleton() {
  return (
    <div className={`rounded-xl bg-white p-6 ${cardShadow}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-7 w-2/3 max-w-sm" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
        </div>
        <Skeleton className="ml-4 h-5 w-5 shrink-0 rounded" />
      </div>
    </div>
  )
}
