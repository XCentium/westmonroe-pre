import Result from '@xc/lib/Result'
import { westMonroe } from '@xc/shared/clients/contentstack'
import GetTeamMembers from './queries/GetTeamQuery.graphql'

export type TeamPageData = {
 teamMembers : TeamMember[];
}
export type TeamMember = {
    title: string
    position: string,
    short_bio: string,
    url:string,
    system:{
      uid:string
    },
    pictureConnection:{
      edges:[
        {
          node:{
            title:string,
            url:string
          }
        }
      ]
  }
}
export default async function getTeamMembers(): Promise<Result<TeamPageData>> {
  const response = await westMonroe.gql.query({
    query: GetTeamMembers,
  })
  if (!response || response.error) {
    return Result.fail('Not Found')
  }

  const item: TeamPageData = {
    teamMembers: response.data["all_team_member"]["items"]
  }
  return Result.success(item)
}
