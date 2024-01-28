export const fetchHashnodePosts = async () => {
  try {
    const response = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
          user(username: "njolipatrick") {
            posts(page: 1, sortBy: DATE_PUBLISHED_DESC, pageSize: 10) {
              nodes {
                title
                subtitle
                url
                slug
                publishedAt
                updatedAt
                content {
                  markdown
                  html
                  text
                }
                coverImage {
                  url
                  isPortrait
                }
              }
            }
          }
        }
        `,
      }),
    });

    if (!response.ok) {
      
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const {
      data: {
        user: {
          posts: { nodes },
        },
      },
    } = await response.json();
    
    return nodes;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
    return [];
  }
}; 
