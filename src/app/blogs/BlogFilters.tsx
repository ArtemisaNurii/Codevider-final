import { useState, useRef, useEffect } from "react";
import { Search, Tag, X, Check, ChevronDown, Calendar } from "lucide-react";

interface BlogFiltersProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	selectedTags: string[];
	setSelectedTags: (tags: string[]) => void;
	availableTags: string[];
	selectedYear: number | null;
	setSelectedYear: (year: number | null) => void;
	availableYears: number[];
}

export default function BlogFilters({
	searchQuery,
	setSearchQuery,
	selectedTags,
	setSelectedTags,
	availableTags,
	selectedYear,
	setSelectedYear,
	availableYears,
}: BlogFiltersProps) {
	const [isTagsOpen, setIsTagsOpen] = useState(false);
	const [isYearsOpen, setIsYearsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const yearsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsTagsOpen(false);
			}
			if (
				yearsRef.current &&
				!yearsRef.current.contains(event.target as Node)
			) {
				setIsYearsOpen(false);
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

	const selectYear = (year: number) => {
		// Radio button behavior: clicking the same year deselects it
		if (selectedYear === year) {
			setSelectedYear(null);
		} else {
			setSelectedYear(year);
		}
		setIsYearsOpen(false); // Close dropdown after selection
	};

	const clearTags = (e: React.MouseEvent) => {
		e.stopPropagation();
		setSelectedTags([]);
	};

	const clearYear = (e: React.MouseEvent) => {
		e.stopPropagation();
		setSelectedYear(null);
	};

	const hasActiveFilters =
		searchQuery || selectedTags.length > 0 || selectedYear !== null;

	return (
		<div className="mb-10 w-full max-w-7xl mx-auto">
			{/* Main Filter Row */}
			<div className="flex flex-col lg:flex-row gap-3 mb-4">
				{/* Search */}
				<div className="relative flex-1 group">
					<div
						className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${searchQuery ? "text-sky-500" : "text-slate-400 group-focus-within:text-sky-500"}`}
					>
						<Search size={20} />
					</div>
					<input
						type="text"
						placeholder="Search articles..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-12 pr-10 py-3 bg-white border border-slate-200 rounded-xl
                             text-slate-900 placeholder:text-slate-400 text-sm
                             focus:outline-none focus:border-sky-500 focus:ring-3 focus:ring-sky-500/10
                             transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-md"
					/>
					{searchQuery && (
						<button
							onClick={() => setSearchQuery("")}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-all"
							aria-label="Clear search"
						>
							<X size={18} />
						</button>
					)}
				</div>

				{/* Topics and Date Range Row - 50/50 on mobile */}
				<div className="flex gap-3 lg:contents">
					{/* Tags Dropdown */}
					<div className="relative flex-1 lg:flex-none lg:shrink-0" ref={dropdownRef}>
						<button
							onClick={() => setIsTagsOpen(!isTagsOpen)}
							className={`w-full flex items-center gap-2.5 px-4 py-3 bg-white border rounded-xl transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap text-sm
                               ${
																	isTagsOpen || selectedTags.length > 0
																		? "border-sky-500 ring-3 ring-sky-500/10"
																		: "border-slate-200 hover:border-slate-300"
																}
                              `}
						>
							<Tag
								size={18}
								className={
									selectedTags.length > 0 ? "text-sky-600" : "text-slate-400"
								}
							/>
							<span
								className={`font-medium ${selectedTags.length > 0 ? "text-slate-900" : "text-slate-600"}`}
							>
								{selectedTags.length > 0
									? `${selectedTags.length} Topic${selectedTags.length !== 1 ? "s" : ""}`
									: "Topics"}
							</span>

							<div className="flex items-center gap-1.5 ml-auto">
								{selectedTags.length > 0 && (
									<span
										onClick={clearTags}
										className="p-0.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-red-500 transition-all cursor-pointer"
										title="Clear tags"
									>
										<X size={14} />
									</span>
								)}
								<ChevronDown
									size={14}
									className={`text-slate-400 transition-transform duration-300 ${isTagsOpen ? "rotate-180" : ""}`}
								/>
							</div>
						</button>

						<div
							className={`absolute top-full left-0 mt-2 w-56 max-h-72 overflow-y-auto
                                  bg-white border border-slate-100 rounded-xl shadow-lg z-30 py-2 
                                  origin-top transition-all duration-200 ease-out
                                  ${isTagsOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}
                                  `}
						>
							<div className="px-3 py-1.5 mb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
								Topics
							</div>
							{availableTags.map((tag) => (
								<button
									key={tag}
									onClick={() => toggleTag(tag)}
									className="w-full flex items-center justify-between px-3 py-2 hover:bg-sky-50 transition-colors text-left group text-sm"
								>
									<span
										className={`transition-colors ${selectedTags.includes(tag) ? "text-sky-700 font-semibold" : "text-slate-600 group-hover:text-slate-900"}`}
									>
										{tag}
									</span>
									{selectedTags.includes(tag) && (
										<Check size={16} className="text-sky-600" />
									)}
								</button>
							))}
							{availableTags.length === 0 && (
								<div className="px-3 py-2 text-xs text-slate-400 text-center italic">
									No topics available
								</div>
							)}
						</div>
					</div>

					{/* Years Dropdown */}
					<div className="relative flex-1 lg:flex-none lg:shrink-0" ref={yearsRef}>
						<button
							onClick={() => setIsYearsOpen(!isYearsOpen)}
							className={`w-full flex items-center gap-2.5 px-4 py-3 bg-white border rounded-xl transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap text-sm
                               ${
																	isYearsOpen || selectedYear !== null
																		? "border-sky-500 ring-3 ring-sky-500/10"
																		: "border-slate-200 hover:border-slate-300"
																}
                              `}
						>
							<Calendar
								size={18}
								className={
									selectedYear !== null ? "text-sky-600" : "text-slate-400"
								}
							/>
							<span
								className={`font-medium ${selectedYear !== null ? "text-slate-900" : "text-slate-600"}`}
							>
								{selectedYear !== null ? selectedYear : "Year"}
							</span>

							<div className="flex items-center gap-1.5 ml-auto">
								{selectedYear !== null && (
									<span
										onClick={clearYear}
										className="p-0.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-red-500 transition-all cursor-pointer"
										title="Clear year"
									>
										<X size={14} />
									</span>
								)}
								<ChevronDown
									size={14}
									className={`text-slate-400 transition-transform duration-300 ${isYearsOpen ? "rotate-180" : ""}`}
								/>
							</div>
						</button>

						<div
							className={`absolute top-full left-0 mt-2 w-40 max-h-72 overflow-y-auto
                                  bg-white border border-slate-100 rounded-xl shadow-lg z-30 py-2 
                                  origin-top transition-all duration-200 ease-out
                                  ${isYearsOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}
                                  `}
						>
							<div className="px-3 py-1.5 mb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
								Year
							</div>
							{availableYears.map((year) => (
								<button
									key={year}
									onClick={() => selectYear(year)}
									className="w-full flex items-center justify-between px-3 py-2 hover:bg-sky-50 transition-colors text-left group text-sm"
								>
									<span
										className={`transition-colors ${selectedYear === year ? "text-sky-700 font-semibold" : "text-slate-600 group-hover:text-slate-900"}`}
									>
										{year}
									</span>
									{selectedYear === year && (
										<Check size={16} className="text-sky-600" />
									)}
								</button>
							))}
							{availableYears.length === 0 && (
								<div className="px-3 py-2 text-xs text-slate-400 text-center italic">
									No years available
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Active Filters Summary */}
			{hasActiveFilters && (
				<div className="flex items-center gap-2 text-xs text-slate-500 px-1">
					<span className="font-medium text-slate-600">Active filters:</span>
					{searchQuery && (
						<span className="px-2.5 py-1 bg-sky-50 text-sky-700 rounded-full border border-sky-200/50 font-medium">
							Search: &quot;{searchQuery}&quot;
						</span>
					)}
					{selectedTags.length > 0 && (
						<span className="px-2.5 py-1 bg-sky-50 text-sky-700 rounded-full border border-sky-200/50 font-medium">
							Topics: {selectedTags.join(", ")}
						</span>
					)}
					{selectedYear !== null && (
						<span className="px-2.5 py-1 bg-sky-50 text-sky-700 rounded-full border border-sky-200/50 font-medium">
							Year: {selectedYear}
						</span>
					)}
				</div>
			)}
		</div>
	);
}
