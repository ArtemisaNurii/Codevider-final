import { useState, useRef, useEffect } from "react";
import { Search, Tag, X, Check, ChevronDown } from "lucide-react";

interface BlogFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
    availableTags: string[];
}

export default function BlogFilters({
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    availableTags,
}: BlogFiltersProps) {
    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsTagsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const clearTags = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedTags([]);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-10 w-full max-w-4xl mx-auto">
            {/* Search */}
            <div className="relative flex-1 group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${searchQuery ? 'text-sky-500' : 'text-slate-400 group-focus-within:text-sky-500'}`}>
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl
                         text-slate-900 placeholder:text-slate-400
                         focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10
                         transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-colors"
                        aria-label="Clear search"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Tags Dropdown */}
            <div className="relative shrink-0" ref={dropdownRef}>
                <button
                    onClick={() => setIsTagsOpen(!isTagsOpen)}
                    className={`flex items-center gap-3 px-5 py-3.5 bg-white border rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md w-full md:w-auto justify-between
                           ${isTagsOpen || selectedTags.length > 0
                            ? 'border-sky-500 ring-4 ring-sky-500/10'
                            : 'border-slate-200 hover:border-slate-300'}
                          `}
                >
                    <div className="flex items-center gap-2.5">
                        <Tag size={20} className={selectedTags.length > 0 ? "text-sky-600" : "text-slate-400"} />
                        <span className={`font-medium ${selectedTags.length > 0 ? 'text-slate-900' : 'text-slate-600'}`}>
                            {selectedTags.length > 0 ? `${selectedTags.length} Selected` : "Topics"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {selectedTags.length > 0 && (
                            <span
                                onClick={clearTags}
                                className="p-0.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                                title="Clear filters"
                            >
                                <X size={14} />
                            </span>
                        )}
                        <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${isTagsOpen ? 'rotate-180' : ''}`} />
                    </div>
                </button>

                <div
                    className={`absolute top-full right-0 mt-3 w-full md:w-72 max-h-80 overflow-y-auto
                              bg-white border border-slate-100 rounded-2xl shadow-xl z-30 py-2 
                              origin-top transition-all duration-200 ease-out
                              ${isTagsOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
                              `}
                >
                    <div className="px-4 py-2 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Filter by Topic
                    </div>
                    {availableTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors text-left group"
                        >
                            <span className={`text-sm transition-colors ${selectedTags.includes(tag) ? 'text-sky-700 font-semibold' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                {tag}
                            </span>
                            {selectedTags.includes(tag) && (
                                <Check size={18} className="text-sky-600" />
                            )}
                        </button>
                    ))}
                    {availableTags.length === 0 && (
                        <div className="px-4 py-3 text-sm text-slate-400 text-center italic">No topics available</div>
                    )}
                </div>
            </div>
        </div>
    );
}
