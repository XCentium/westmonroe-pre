import Result from '@xc/lib/Result'
import { westMonroe } from '@xc/shared/clients/contentstack'
import GetTeamMemberDetails from './queries/GetTeamMemberQuery.graphql'

export type TeamMemberDetails = {
  teamMember: {
    title: string
    full_name: string
    position: string
    bio: string
    differentiation: string
    impact: string
    short_bio: string
    url: string
    linkedin_profile: {
      title: string
      href: string
    }
    system: {
      uid: string
    }
    pictureConnection: {
      edges: [
        {
          node: {
            title: string
            url: string
          }
        },
      ]
    }
  }
}
export default async function getTeamMemberDetails(uid: string): Promise<Result<TeamMemberDetails>> {
  const response = await westMonroe.gql.query({
    query: GetTeamMemberDetails,
    variables: {
      uid: uid,
    },
  })
  if (!response || response.error) {
    return Result.fail('Not Found')
  }

  const item: TeamMemberDetails = {
    teamMember: response.data['team_member'],
  }
  return Result.success(item)
}
