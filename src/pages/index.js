import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';
import { useData } from '../theme/Root';

async function auth(login, password) {
  const response = await fetch('https://goiteens-platform.vercel.app/api/authorization', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      password,
    }),
  });
  return response.json();
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { data, setData } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = e.target[0].value;
    const password = e.target[1].value;

    try {
      const result = await auth(login, password);
      if(result[1].idRoom){
        fetch(`https://goiteens-platform.vercel.app/api/classroom/${result[1].idRoom}`)
        .then(response => response.json())
        .then(data => setData({
          status: result[0].status,
          login:e.target[0].value,
          idRoom: result[1].idRoom,
          material: data.material
        }));
      }else{
        setData({
          status: result[0].status,
          login:e.target[0].value,
          idRoom: result[1].idRoom,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <p>{data.material}</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="login" required />
          <input type="password" placeholder="password" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}