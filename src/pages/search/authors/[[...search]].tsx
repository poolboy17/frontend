import { gql } from '@/__generated__'
import {
    NcgeneralSettingsFieldsFragmentFragment,
    SearchPageQueryGetUsersBySearchQuery,
} from '@/__generated__/graphql'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import CardAuthorBox from '@/components/CardAuthorBox/CardAuthorBox'
import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import Empty from '@/components/Empty'
import PageLayout from '@/container/PageLayout'
import SearchPageLayout from '@/container/SearchPageLayout'
import { GET_USERS_FIRST_COMMON, REVALIDATE_TIME } from '@/contains/contants'
import { FOOTER_LOCATION, PRIMARY_LOCATION } from '@/contains/menu'
import errorHandling from '@/utils/errorHandling'
import getTrans from '@/utils/getTrans'
import { getUserDataFromUserCardFragment } from '@/utils/getUserDataFromUserCardFragment'
import { useLazyQuery } from '@apollo/client'
import { FaustPage, getNextStaticProps } from '@faustwp/core'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const Page: FaustPage<SearchPageQueryGetUsersBySearchQuery> = (props) => {
	const router = useRouter()
	const initUsers = props.data?.users?.nodes
	const initPageInfo = props.data?.users?.pageInfo
	const _top10Categories =
		(props.data?.categories?.nodes as TCategoryCardFull[]) || []
	const search = router.query.search?.[0] || ''
	const T = getTrans()

	const [getUsersBySearch, getUsersBySearchResult] = useLazyQuery(
		gql(` 
      query queryGetUsersBySearchOnSearchPage(
        $first: Int
        $search: String
        $after: String
      ) {
        users(first: $first, after: $after, where: { search: $search }) {
          nodes {
            ...NcmazFcUserFullFields
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `),
		{
			notifyOnNetworkStatusChange: true,
			context: {
				fetchOptions: {
					method: process.env.NEXT_PUBLIC_SITE_API_METHOD || 'GET',
				},
			},
			variables: {
				search,
				first: GET_USERS_FIRST_COMMON,
			},
		},
	)

	// Apollo 3.14+ error handling: useEffect for errors
	React.useEffect(() => {
		if (getUsersBySearchResult.error) {
			errorHandling(getUsersBySearchResult.error);
		}
	}, [getUsersBySearchResult.error]);

	const handleClickShowMore = () => {
		if (!getUsersBySearchResult.called) {
			return getUsersBySearch({
				variables: {
					search,
					after: initPageInfo?.endCursor,
				},
				context: {
					fetchOptions: {
						method: process.env.NEXT_PUBLIC_SITE_API_METHOD || 'GET',
					},
				},
			})
		}

		getUsersBySearchResult.fetchMore({
			variables: {
				search,
				after: getUsersBySearchResult.data?.users?.pageInfo.endCursor,
			},
			context: {
				fetchOptions: {
					method: process.env.NEXT_PUBLIC_SITE_API_METHOD || 'GET',
				},
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult || !fetchMoreResult.users?.nodes) {
					return prev
				}

				return {
					...prev,
					users: {
						...prev.users,
						nodes: [
							...(prev.users?.nodes || []),
							...(fetchMoreResult.users?.nodes || []),
						],
						pageInfo: fetchMoreResult.users?.pageInfo,
					},
				}
			},
		})
	}

	// data for render
	let currentUsers = initUsers || []
	let hasNextPage = initPageInfo?.hasNextPage
	let loading = false

	if (getUsersBySearchResult.called) {
		currentUsers = [
			...(initUsers || []),
			...(getUsersBySearchResult.data?.users?.nodes || []),
		]

		hasNextPage =
			getUsersBySearchResult.loading ||
			getUsersBySearchResult.data?.users?.pageInfo.hasNextPage ||
			false
		loading = getUsersBySearchResult.loading
	}

	return (
		<PageLayout
			headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
			footerMenuItems={props.data?.footerMenuItems?.nodes || []}
			pageFeaturedImageUrl={null}
			pageTitle={'Search'}
			generalSettings={
				props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
			}
		>
			<SearchPageLayout top10Categories={_top10Categories}>
				{/* LOOP ITEMS */}
				{!currentUsers.length && !loading ? (
					<Empty />
				) : (
					<div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:mt-12 lg:grid-cols-3 xl:grid-cols-5">
						{(currentUsers || []).map((user) => (
							<CardAuthorBox
								key={getUserDataFromUserCardFragment(user).databaseId}
								author={user}
							/>
						))}
					</div>
				)}

				{/* PAGINATION */}
				{hasNextPage ? (
					<div className="mt-12 flex justify-center lg:mt-14">
						<ButtonPrimary
							disabled={loading || !currentUsers?.length}
							loading={loading}
							onClick={handleClickShowMore}
						>
							{T['Show me more']}
						</ButtonPrimary>
					</div>
				) : null}
			</SearchPageLayout>
		</PageLayout>
	)
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	}
}
export function getStaticProps(ctx: GetStaticPropsContext) {
	return getNextStaticProps(ctx, {
		Page,
		revalidate: REVALIDATE_TIME,
	})
}

Page.variables = ({ params }) => {
	return {
		search: params?.search?.[0] || '',
		first: GET_USERS_FIRST_COMMON,
		headerLocation: PRIMARY_LOCATION,
		footerLocation: FOOTER_LOCATION,
	}
}

Page.query = gql(`
  query SearchPageQueryGetUsersBySearch ( $first: Int,  $search: String = "", $after: String, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum! )  {
    users(first: $first, after: $after, where: {search: $search}) {
        nodes {
             ...NcmazFcUserFullFields
        }
        pageInfo {
          endCursor
          hasNextPage
        }
    }
    categories(first:10, where: { orderby: COUNT, order: DESC }) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
      }
    }
   # common query for all page 
   generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location:  $headerLocation  }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 50) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    # end common query
  }
`)

export default Page
