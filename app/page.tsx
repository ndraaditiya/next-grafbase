import { ProjectInterface } from '@/common.types'
import Categories from '@/components/Categories'
import LoadMore from '@/components/LoadMore'
import ProjectCard from '@/components/ProjectCard'
import { fetchAllProjects } from '@/lib/action'

type ProjectsSearch = {
  projectSearch: {
    edges: {
      node: ProjectInterface
    }[]
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string
      endCursor: string
    }
  }
}

type Props = {
  searchParams: {
    category?: string
    endcursor?: string
  }
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

// npx grafbase@0.24 dev

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = (await fetchAllProjects(category, endcursor)) as ProjectsSearch

  const projectsToDisplay = data?.projectSearch?.edges || []

  if (projectsToDisplay.length === 0) {
    return (
      <section className='flexStart flex-col paddigns'>
        <Categories />
        <p className='no-result-text text-center'>
          No projects found, go create some first.
        </p>
      </section>
    )
  }

  const pagination = data?.projectSearch?.pageInfo

  return (
    <section className='flex-start felx-col paddings mb-16'>
      <Categories />
      <section className='projects-grid'>
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>

      <LoadMore
        startCursor={pagination?.startCursor}
        endCursor={pagination?.endCursor}
        hasPreviousPage={pagination?.hasPreviousPage}
        hasNextPage={pagination?.hasNextPage}
      />
    </section>
  )
}

export default Home
