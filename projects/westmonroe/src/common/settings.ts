const settings = {
  contentstack: {
    env: {
      apiHost: process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST,
      authToken: process.env.NEXT_PUBLIC_CONTENTSTACK_AUTH_TOKEN,
      authorization: process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN,
      apikey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
    },
    entries: {
      blog_post_entries: `/v3/content_types/blog_post/entries`,
      team_member_entries: `/v3/content_types/team_member/entries`,
    },
  },
}

export default settings
