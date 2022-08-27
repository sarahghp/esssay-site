import React from 'react'
import { graphql } from 'gatsby'
import { Layout, NavFooter } from '../components'

import './essay.css'

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();

const Essay = ({ data }) => {
  const post = data.markdownRemark;
  const imageLayoutClass = post.frontmatter.imgStyles ? 'apply-image-layout' : '';
  return (
    <Layout>
      <div id="essay" className={imageLayoutClass}>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <NavFooter current={post.frontmatter.current} />
    </Layout>
  )
}

export default Essay;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        current
        imgStyles
      }
    }
  }
`
