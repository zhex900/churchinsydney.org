import { describe, expect, test } from 'vitest';

import Page, { getStaticProps } from '@/pages/post/[slug]';

import { render, screen } from '../testUtils';

const mockPost = {
  slug: 'slug-post',
  tags: ['Event'],
  banner: 'https://backend/assets/image-id',
  dateCreated: '2020-01-01',
  dateUpdated: '2020-01-01',
  start: null,
  end: null,
  rank: 100,
  title: 'Title',
  summary: null,
  body:
    'var Component=(()=>{var x=Object.create;var c=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var j=Object.getOwnPropertyNames;var p=Object.getPrototypeOf,_=Object.prototype.hasOwnProperty;var f=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),l=(n,t)=>{for(var e in t)c(n,e,{get:t[e],enumerable:!0})},i=(n,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of j(t))!_.call(n,o)&&o!==e&&c(n,o,{get:()=>t[o],enumerable:!(s=d(t,o))||s.enumerable});return n};var M=(n,t,e)=>(e=n!=null?x(p(n)):{},i(t||!n||!n.__esModule?c(e,"default",{value:n,enumerable:!0}):e,n)),b=n=>i(c({},"__esModule",{value:!0}),n);var u=f((D,a)=>{a.exports=_jsx_runtime});var y={};l(y,{default:()=>h});var r=M(u());function m(n){let t=Object.assign({p:"p"},n.components);return(0,r.jsx)(t.p,{children:"Body"})}function g(n={}){let{wrapper:t}=n.components||{};return t?(0,r.jsx)(t,Object.assign({},n,{children:(0,r.jsx)(m,n)})):m(n)}var h=g;return b(y);})();\n' +
    ';return Component;',
};

describe("Member's page", () => {
  test("Post without member's tag should not ask for login", async () => {
    const { props } = await getStaticProps({
      locale: 'en',
      params: { slug: 'post' },
    });
    mockPost.title = 'Post without members tag';
    mockPost.tags = [];
    const _props = { ...props, ...{ post: mockPost } };

    render(<Page {..._props} />);

    expect(screen.queryByText("Member's Login")).not.toBeInTheDocument();
    expect(screen.queryByText(mockPost.title)).toBeInTheDocument();
  });

  test("Post with member's tag should ask for login", async () => {
    const { props } = await getStaticProps({
      locale: 'en',
      params: { slug: 'post' },
    });
    mockPost.title = 'Post without members tag';
    mockPost.tags = ['members'];
    const _props = { ...props, ...{ post: mockPost } };

    render(<Page {..._props} />);

    expect(screen.queryByText("Member's Login")).toBeInTheDocument();
    expect(
      screen.queryByText("Please enter the member's password")
    ).toBeInTheDocument();

    expect(screen.queryByText(mockPost.title)).not.toBeInTheDocument();
  });
});
