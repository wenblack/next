import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "@/components/Layout";
import Post, { PostProps } from "@/components/Post";
import prisma from "@/lib/prisma";


export const getServerSideProps: GetServerSideProps = async () => {
    const feed = await prisma.post.findFirst({
    where: {
      id: 1,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed },
  };
};

type Props = {
  feed: PostProps;
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1 className="text-black p-8">Public Feed</h1>
        <main>
              <Post post={props.feed} />
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
