import { GetStaticProps } from "next";
import { Container, Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { PortableText } from "@portabletext/react";
// import BlockContent from "@sanity/block-content-to-react";
// import markdownStyles from "../../styles/markdown-styles.module.scss";

const BlogPost = ({ post }: { post: any}) => {
  return (
    <article>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Box py={10}>
        <Container>
          <Heading>{post.title}</Heading>
          <PortableText 
            value={post.body}
          />
        </Container>
      </Box>
    </article>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageSlug = params?.slug;
  const query =
    encodeURIComponent(`*[ _type == "post" && slug.current == "${pageSlug}"]`);

  const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());
  const returnedPost = result.result[0];

  return {
    props: {
      post: returnedPost,
    },
    revalidate: 60,
  };
};

export async function getStaticPaths() {
  const query = encodeURIComponent(`*[ _type == "post"] | order(_createdAt asc) { slug }`);

  const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then(res => res.json());
  const allPosts = result.result;

  return {
    paths:
      allPosts?.map((post: any) => ({
        params: {
          slug: post.slug.current,
        },
      })) || [],
    fallback: false,
  }
}

export default BlogPost;
