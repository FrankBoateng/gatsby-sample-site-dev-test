const {
  getChairmansWords,
  createArticleListPage,
  createIndividualArticlePages,
} = require("./src/generated_pages/fetch-chairmans-words.js")
const {
  getStudyTextMaterial,
  getStudyTextCategories,
  createStudyTextCategoriesPages,
  createStudyTextContentListPages,
  createIndividualStudyTextContentPages,
} = require("./src/generated_pages/fetch-study-text-content.js")

const {
  getReviewMaterials,
  createReviewMaterialListPage,
  createIndividualReviewMaterialPages,
} = require("./src/generated_pages/fetch-review-materials.js")

const {
  getGMCreationManual,
  createGMCreationManualListPage,
  createIndividualGMCreationManualPages,
} = require("./src/generated_pages/fetch-gm-creation-manual.js")

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query our posts from the GraphQL server
  const posts = await getChairmansWords(gatsbyUtilities)

  // If there are no posts in WordPress, don't do anything
  if (!posts.length) {
    return
  }

  // If there are posts, create pages for them
  await createIndividualArticlePages({ posts, gatsbyUtilities })

  // And a paginated archive
  await createArticleListPage({ posts, gatsbyUtilities })

  // Query our gm_posts from the GraphQL server - starts
  const gm_posts = await getGMCreationManual(gatsbyUtilities)

  // If there are no posts in WordPress, don't do anything
  if (!gm_posts.length) {
    return
  }

  // If there are posts, create pages for them
  await createIndividualGMCreationManualPages({ gm_posts, gatsbyUtilities })

  // And a paginated archive
  await createGMCreationManualListPage({ gm_posts, gatsbyUtilities })
// Query our gm_posts from the GraphQL server - ends

  // Query our review_posts from the GraphQL server - starts
  const review_posts = await getReviewMaterials(gatsbyUtilities)

  // If there are no posts in WordPress, don't do anything
  if (!review_posts.length) {
    return
  }

  // If there are posts, create pages for them
  await createIndividualReviewMaterialPages({ review_posts, gatsbyUtilities })

  // And a paginated archive
  await createReviewMaterialListPage({ review_posts, gatsbyUtilities })
// Query our review_posts from the GraphQL server - ends

  // Query our posts from the GraphQL server
  const studyTextPosts = await getStudyTextMaterial(gatsbyUtilities)

  // If there are no posts in WordPress, don't do anything
  if (!studyTextPosts.length) {
    return
  }

  // If there are posts, create pages for them
  await createIndividualStudyTextContentPages({
    studyTextPosts,
    gatsbyUtilities,
  })

  const studyTextCategories = await getStudyTextCategories(gatsbyUtilities)

  // If there are no categories in WordPress, don't do anything
  if (!studyTextCategories.length) {
    return
  }

  // If there are study text categories, create pages for them
  await createStudyTextCategoriesPages({ studyTextCategories, gatsbyUtilities })

  // // And a paginated archive
  await createStudyTextContentListPages({
    studyTextCategories,
    gatsbyUtilities,
  })

}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`

    // Update the page.
    createPage(page)
  }
}
