import React, { useEffect } from 'react';
import Routes from '@/Services/Routes';
import { useRouter } from 'next/router';


const ArticlePage = () => {

  const router = useRouter()

  useEffect(() => {
    let slug = router?.query?.articleSlug;
    if (slug) {
      console.log('router', slug);
      router.replace(`${Routes.Articles}/${slug}`)
    }
  }, [router?.query])

  return <p>Taking you to our new page...</p>;
}

export default ArticlePage;