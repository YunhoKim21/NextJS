const projectsData = {
  academic_projects: [
    {
      title: 'DiffFace',
      description: 'Diffusion-based Face Swapping with Facial Guidance',
      imgSrc: '/static/images/diffface.png',
      href: 'https://hxngiee.github.io/DiffFace/',
    },
  ],
  toy_projects: [
    {
      title: 'Line segment intersection',
      description: `The following code detects all intersection of randomly generated line segments, in O(nlogn) time complexity.`,
      imgSrc: '/static/images/intersect.png',
      href: '/projects/line-segment-intersection',
    },
    {
      title: 'Convex hull generation',
      description: `The following code generates convex hull, in O(nlogn) time complexity. Graham scan is used. `,
      imgSrc: '/static/images/convexhull.png',
      href: '/projects/convex-hull',
    },
    {
      title: 'Connect4',
      description: `play connect 4`,
      imgSrc: '/static/images/connect4.png',
      href: '/projects/connect4',
    },
  ],
}

export default projectsData
