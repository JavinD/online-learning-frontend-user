export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone_no: string;
  referrer: string;
}

export interface IFilterRequest {
  page: number;
  size: number;
  sortBy: string;
  sortDir: string;
  search: string;
  last: string;
  tags: string;
  category: string;
}

export interface IPaginationResponse {
  total_item: number;
  total_page: number;
  limit: number;
}

export interface IPagination {
  pagination_response: IPaginationResponse;
  data: ICourse[];
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  role_id: number;
  fullname: string;
  address: string;
  phone_no: string;
  level_id: number;
  referral_code: string;
  referrer: string;
  level: ILevel;
}

export interface ILevel {
  id: number;
  name: string;
  discount_percent: number;
  max_transaction: number;
}

export interface ICourse {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  status: string;
  price: number;
  summary_desc: string;
  img_thumbnail: string;
  img_url: string;
  author_name: string;
  tag: ITag[];
  category: ICategory;
  created_at: string;
  updated_at: string;
}

export interface IUserCourse {
  course: ICourse;
  content: string;
  created_at: string;
  id: number;
  updated_at: string;
  user_id: number;
  course_id: number;
  status: string;
}

export interface IUserCourseRequest {
  token: string;
  id: number | undefined;
}

export interface ICourseRequest {
  token: string;
  slug: string | undefined;
}

export interface ICartItem {
  id: number;
  cart_id: number;
  course_id: number;
  created_at: string;
  updated_at: string;
  course: ICourse;
}

export interface ICourseDetail {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  content: string;
  img_url: string;
  status: string;
  price: number;
  summary_desc: string;
  img_thumbnail: string;
  author_name: string;
  tag: ITag[];
  category: ICategory;
  created_at: string;
  updated_at: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ITag {
  id: number;
  name: string;
}
