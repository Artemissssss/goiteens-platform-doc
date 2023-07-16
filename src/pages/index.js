import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';
import { useData } from '../theme/Root';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const {data, setData} = useData()
  
  const auth = (e) =>{
    e.preventDefault();
    fetch('https://goiteens-platform.vercel.app/api/authorization',{
      method: 'POST',
      body: JSON.stringify({"login":e.target[0].value,"password":e.target[1].value}),
      headers: {
        'Content-Type': 'application/json'
      }}).then(response => response.json()).then(data2 => setData({status:data2[0].status, login:e.target[0].value, idRoom:data2[1].idRoom}));
}

return (
  <header className={clsx('hero hero--primary', styles.heroBanner)}>
    <div className="container">
      <p>{data.status}</p>
    <form onSubmit={auth}>
    <input type="text" placeholder="login" required/>
    <input type="password" placeholder="password" required/>
    <button>Submit</button>
</form>
</div>
</header>
)
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
