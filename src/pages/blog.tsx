import React from 'react'
import configs from '../configs'
import Head from 'next/head'
import Link from 'next/link'

import { GetServerSideProps } from "next";
import PageHeaderHome from "../components/PageHeaderHome"
import Footer from "../components/Footer"

import { GraphQLClient } from 'graphql-request';

import { useRouter } from 'next/dist/client/router';
import BlogItem from '../components/BlogItem';
import SEO from '../components/SEO';
import PageHeaderWithTitle from '../components/PageHeaderWithTitle';

interface Posts {
  slug: string;
  titulo: string;
  conteudo: string;
  imagem: {
    url: string;
  }
};

interface HomeProps {
  posts: Posts[]
}

export default function Home({ posts }: HomeProps) {

  console.log(posts)

  return (
    <div id="Container" className="flex flex-col bg-gray-100 min-h-screen w-full">
      <SEO
        title={configs.title}
        description=""
        shoudExcludeTitleSuffix

        siteName={configs.title}
      />

      <PageHeaderWithTitle title="Blog" icon={<div />} >  </PageHeaderWithTitle>

      <div id="InnerContainer" className=" rounded-tr-2xl relative w-full bg-gray-100 flex -mt-9">

        <div id="TreeColumns" className="flex h-full w-full pb-5">
          <span className="opensans-bold mt-2 text-xl px-4">Posts Recentes</span>
        </div>
      </div>

      {<Footer />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const graphcms = new GraphQLClient(
    configs.graphcmsBlogUrl
  );

  const { posts } = await graphcms.request(
    `{
      posts(orderBy: publishedAt_DESC) {
        slug
        titulo
        conteudo {
          text
        }
        imagem {
          url(transformation: {image: {resize: {height: 200, width: 400}}})
        }
      }
    }
    `
  );
 
  return {
    props: {
      posts
    }
  }
}; 