export type SearchItem = Readonly<{
  first_name: string;
  last_name: string;
  position: string;
  brand_label: string;
  picture: { url: string; title: string };
  short_bio: string;
  summary_info:{summary_title: string, social_share_image:string, summary_image:"", summary_description:""};
  title:string;
  linkedin_profile: {title:string, href:string}
  uid:string
  url:string
}>;
