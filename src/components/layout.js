import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import './layout.css'

const Layout = ({ wide = false, children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <div
          style={{
            margin: '0 auto',
            padding: `5vw ${ wide ? '2vw' : '5vw' }`, 
            minHeight: '100vh',
            maxWidth: `${ wide ? '90vw' : '80vw' }`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          {children}

        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
