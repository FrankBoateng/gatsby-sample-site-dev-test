const path = require(`path`)
const chunk = require(`lodash/chunk`)

/**
 * This function creates all the individual blog pages in this site
 */
exports.createIndividualStudyTextContentPages = async ({ studyTextPosts, gatsbyUtilities }) =>
  Promise.all(
    studyTextPosts.map(({ post }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: post.uri,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/study-text-content.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

        },
      })
    )
  )


/**
 * This function creates all the individual blog pages in this site
 */
exports.createStudyTextContentListPages = async({ studyTextCategories, gatsbyUtilities }) => {
  
  return Promise.all(
    studyTextCategories.map(async categoryNode => {

      await createStudyTextPagesForCategory({categoryNode, gatsbyUtilities})
    })
  )
}

const createStudyTextPagesForCategory = async({ categoryNode, gatsbyUtilities }) => {

  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)
  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  const studyTextMaterialForCategory = await getStudyTextMaterialForCategory({categoryNode, gatsbyUtilities})
  const category = categoryNode.category

  const postsChunkedIntoArchivePages = chunk(studyTextMaterialForCategory, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_studyTextMaterialForCategory, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? `/study-text/${category.slug}` : `/study-text/${category.slug}/${page}`
        }

        return null
      }

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/study-text-content-list.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,
          categoryID: category.id,
          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      })
    })
  )
}


/**
 * This function creates all the individual blog pages in this site
 */
exports.createStudyTextCategoriesPages = async({ studyTextCategories, gatsbyUtilities }) => {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  const postsChunkedIntoArchivePages = chunk(studyTextCategories, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_studyTextCategories, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? `/study-text-categories/` : `/study-text-categories/${page}`
        }

        return null
      }

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/study-text-category-list.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,
          
          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      })
    })
  )
}


/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
const getStudyTextMaterialForCategory = async({ categoryNode, gatsbyUtilities }) => {
  const catID = categoryNode.category.id
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
  query WpPosts {
    # Query all WordPress blog posts sorted by date
    allWpPost(
      filter: {categories: {nodes: {elemMatch: {id: {eq: "${catID}"}}}}}
      sort: {date: DESC}
    ) {
      edges {
        # note: this is a GraphQL alias. It renames "node" to "post" for this query
        # We're doing this because this "node" is a post! It makes our code more readable further down the line.
        post: node {
          id
          uri
          title
        }
        next {
          id
        }
        previous {
          id
        }
      }
    }
  }
  `)

  if (graphqlResult.errors) {
    gatsbyUtilities.reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}


/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
exports.getStudyTextCategories = async({ graphql, reporter }) => {
  const graphqlResult = await graphql(/* GraphQL */ `
  query WpPosts {
    # Query all WordPress categories belonging to posts with tag slug "study-text-material" sorted by date
    allWpCategory(
      filter: {posts: {nodes: {elemMatch: {tags: {nodes: {elemMatch: {slug: {eq: "study-text-material"}}}}}}}}
      sort: {posts: {nodes: {date: DESC}}}
    ) {
      edges {
        # note: this is a GraphQL alias. It renames "node" to "post" for this query
        # We're doing this because this "node" is a post! It makes our code more readable further down the line.
        category: node {
          id
          slug
          name
        }
      }
    }
  }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpCategory.edges
}


/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
exports.getStudyTextMaterial = async({ graphql, reporter }) => {
  const graphqlResult = await graphql(/* GraphQL */ `
  query WpPosts {
    # Query all WordPress blog posts sorted by date
    allWpPost(
      filter: {tags: {nodes: {elemMatch: {slug: {eq: "study-text-material"}}}}}
      sort: {date: DESC}
    ) {
      edges {
        # note: this is a GraphQL alias. It renames "node" to "post" for this query
        # We're doing this because this "node" is a post! It makes our code more readable further down the line.
        post: node {
          id
          uri
          categories {
            nodes {
              name
              slug
            }
          }
        }
        next {
          id
        }
        previous {
          id
        }
      }
    }
  }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}