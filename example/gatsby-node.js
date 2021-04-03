const { VanillaExtractPlugin } = require(`@vanilla-extract/webpack-plugin`)

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: require.resolve(`@vanilla-extract/babel-plugin`),
  })
}

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === `develop` || stage === `build-javascript`) {
    actions.setWebpackConfig({
      plugins: [new VanillaExtractPlugin()],
    })
  }
}
