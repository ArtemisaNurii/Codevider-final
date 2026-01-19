interface Pillar {
  icon: React.ReactNode;
  title: string;
  description: string;
}
interface TextProps {
  children: React.ReactNode;
  reverse?: boolean;
  transition?: AnimationOptions;
  splitBy?: "words" | "characters" | "lines" | string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  containerClassName?: string;
  wordLevelClassName?: string;
  elementLevelClassName?: string;
  onClick?: () => void;
  onStart?: () => void;
  onComplete?: () => void;
  autoStart?: boolean; // Whether to start the animation automatically
  once?: boolean; // Whether to animate only once
}

interface VerticalCutRevealRef {
  startAnimation: () => void;
  reset: () => void;
}

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}
interface JobAddress {
  id: number;
  created_at: string;
  updated_at: string;
  job_id: number;
  address_id: number;
  address: {
    id: number;
    deletedAt: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    deletedBy: string | null;
    version: number;
    createdAt: string;
    updatedAt: string;
    location: string;
    address: string;
    is_default: boolean;
    tax_number: string | null;
    tax_name: string | null;
  };
}

interface Department {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  parent_id: number | null;
}

interface JobType {
  id: number;
  created_at: string;
  updated_at: string;
  job_type: string;
}

interface Job {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  slug: string;
  job_description: string;
  total_positions: number;
  remaining_openings: number;
  department_id: number;
  job_type_id: number;
  pay_according_to: string;
  pay_type: string;
  start_amount: number;
  end_amount: number | null;
  start_date: string;
  end_date: string;
  status: boolean;
  meta_details: string;
  is_photo_required: boolean;
  is_resume_required: boolean;
  is_dob_required: boolean;
  is_gender_required: boolean;
  addresses: JobAddress[];
  department: Department;
  job_type: JobType;
  resume?: File;
}

interface JobsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface JobsResponse {
  data: Job[];
  meta: JobsMeta;
}
interface WebsiteApplication {
  job_id: number;
  full_name: string;
  email: string;
  phone: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  location_id: number;
  photo?: File;
  date_of_birth?: string;
  recruit_candidate_id?: number;
  cover_letter?: string;
  resume?: File;
}

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}
interface LogoIconProps {
  hexagonRef: Ref<SVGPathElement>;
  bracketsRef: Ref<SVGPathElement>;
  heartRef: Ref<SVGPathElement>;
}

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

interface HeroHeadlineProps {
	displayedText: string;
}

interface CaseStudyHeroProps {
	title: string;
	subtitle: string;
}

interface KeyMetric {
	icon: React.ElementType;
	value: string;
	label: string;
}

interface ProjectInfoData {
	client: string;
	industry: string;
	services: string[];
}

interface CaseStudyContentSectionData {
	title: string;
	id: "context" | "solution" | "results";
	paragraphs: string[];
	listItems?: string[];
}

interface CaseStudy {
	id: number;
	slug: string;
	heroImage: string;
	title: string;
	subtitle: string;
	keyMetrics: KeyMetric[];
	projectInfo: ProjectInfoData;
	content: CaseStudyContentSectionData[];
}
interface Project {
	id: number;
	title: string;
	category: string;
	imageUrl: string;
	description: string;
	features: string[];
	duration?: string;
	client?: string;
}
interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

interface ProcessStepProps {
  step: string;
  title: string;
  description: string;
  delay?: number;
}

interface StepData {
  step: string;
  title: string;
  description: string;
}

interface ServiceItem {
	title: string;
	description: string;
}

interface TechItemType {
  name: string;
  icon: React.ReactElement;
}

interface TechnologyCategoryType {
  category: string;
  items: TechItemType[];
}

interface TechCategoryProps {
	title: string;
	items: TechItemType[];
}
