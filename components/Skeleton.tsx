export default function Skeleton() {
    return (
        <div className="w-full max-w-sm rounded-md">
            <div className="animate-pulse space-y-3">
                <div className="grid grid-cols-3 gap-2">
                    <div className="h-20 bg-slate-200 rounded"></div>
                    <div className="h-20 bg-slate-200 rounded"></div>
                    <div className="h-20 bg-slate-200 rounded"></div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <div className="h-20 bg-slate-200 rounded"></div>
                    <div className="h-20 bg-slate-200 rounded"></div>
                    <div className="h-20 bg-slate-200 rounded"></div>
                </div>

                <div className="space-y-2">
                    <div className="h-12 bg-slate-200 rounded w-3/5"></div>
                    <div className="h-12 bg-slate-200 rounded w-4/5"></div>
                </div>
            </div>
        </div>
    );
}
