import { visit } from "unist-util-visit"

import { findAfter } from "unist-util-find-after"

export default () => tree => {
  visit(
    tree,
    node => node.type === "heading" && node.depth === 2,
    (node, current_h2_index, parent) => {
      let next_h2 = findAfter(
        parent,
        node,
        
        n => n.type === "heading" && n.depth === 2
      )

      let next_h2_index = parent.children.indexOf(next_h2)

      let children
      if (next_h2_index > 0) {
        children = parent.children.slice(current_h2_index, next_h2_index)
      } else {
        children = parent.children.slice(current_h2_index)
      }

      parent.children.splice(current_h2_index, children.length, {
        type: "parent",
        depth: 2,
        children,
        data: {
          hName: "section",
        },
      })
    }
  )
}