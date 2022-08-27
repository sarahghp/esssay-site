import React from "react"
import { graphql } from "gatsby"
import { Layout, NavFooter } from "../components"

const Text = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <NavFooter current={post.frontmatter.current} />
    </Layout>
  )
}

export default Text;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        current
      }
    }
  }
`
